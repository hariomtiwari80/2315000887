# Notification System Design

## Stage 1 - REST API Design

### Core Actions

1. Create Notification
2. Get Notifications
3. Get Notification By ID
4. Mark Notification As Read
5. Delete Notification
6. Get Top Priority Notifications

### Endpoints

#### Create Notification

POST /api/notifications

Request

{
"userId": "123",
"title": "Placement Update",
"message": "Congratulations!",
"type": "Placement"
}

Response

{
"success": true,
"notificationId": "abc123"
}

#### Get Notifications

GET /api/notifications?userId=123

#### Get Notification By ID

GET /api/notifications/:id

#### Mark As Read

PATCH /api/notifications/:id/read

#### Delete Notification

DELETE /api/notifications/:id

### Real-Time Notifications

WebSocket / Socket.IO

Events:

* notification:new
* notification:read
* notification:deleted

---

## Stage 2 - Storage Design

### Database Choice

MongoDB

Reasons:

* Flexible schema
* High write throughput
* Easy horizontal scaling
* Suitable for notification workloads

### Notification Collection

Fields:

* _id
* userId
* title
* message
* type
* isRead
* createdAt
* updatedAt

### Indexes

* userId
* createdAt
* isRead
* type

### Potential Growth Issues

* Large notification volume
* Slow unread queries
* Storage growth

### Solutions

* Compound indexes
* Archiving old notifications
* Pagination
* Sharding

---

## Stage 3 - Query Optimization

Problem:

Fetching unread notifications becomes slow as data grows.

Example Query:

Find unread notifications for a user sorted by newest first.

Optimization:

* Compound Index (userId, isRead, createdAt)
* Pagination
* Projection

Why Not Index Every Column?

* Increased storage
* Slower writes
* Higher maintenance overhead

Query To Find Placement Notifications In Last 7 Days

Filter:

* notificationType = Placement
* createdAt >= currentDate - 7 days

---

## Stage 4 - Performance Improvements

Current Problem:

Notifications are fetched from the database on every page load.

Solutions:

### Redis Cache

Pros:

* Fast reads
* Reduced database load

Cons:

* Cache invalidation complexity

### Pagination

Pros:

* Smaller payloads

Cons:

* Additional client logic

### Read Replicas

Pros:

* Better read scalability

Cons:

* Infrastructure cost

### WebSocket Push

Pros:

* Real-time updates

Cons:

* Persistent connections

---

## Stage 5 - Bulk Notification Architecture

Problem:

HR sends notifications to 50,000 students.

Issues:

* Long execution time
* Partial failures
* Email bottlenecks

Improved Design:

Producer

↓

Message Queue

↓

Workers

↓

Email Service

↓

Notification Service

Benefits:

* Retry support
* Fault tolerance
* Horizontal scaling

Recommended Components:

* RabbitMQ / Kafka
* Worker Pool
* Dead Letter Queue

---

## Stage 6 - Priority Inbox

Goal:

Display top N most important unread notifications.

Priority Formula:

Priority Score = Type Weight + Recency Score

Weights:

Placement = 3

Result = 2

Event = 1

Approach:

1. Fetch unread notifications
2. Calculate score
3. Insert into priority queue
4. Extract top N

Data Structure:

Priority Queue (Max Heap)

Complexity:

Insertion: O(log n)

Removal: O(log n)

Top Notification: O(1)

Handling New Notifications:

* Compute score immediately
* Insert into heap
* Rebalance priority queue

Benefits:

* Efficient top-N retrieval
* Real-time updates
* Scalable for large volumes
