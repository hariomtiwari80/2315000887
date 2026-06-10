class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  getPriority(priority) {
    const priorities = {
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };

    return priorities[priority?.toUpperCase()] || 1;
  }

  insert(notification) {
    this.queue.push(notification);

    this.queue.sort(
      (a, b) =>
        this.getPriority(b.priority) -
        this.getPriority(a.priority)
    );
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }

    return this.queue.shift();
  }

  peek() {
    return this.isEmpty() ? null : this.queue[0];
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const notificationQueue = new PriorityQueue();

export const initializeNotificationSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("notification:create", (notification) => {
      notificationQueue.insert(notification);

      while (!notificationQueue.isEmpty()) {
        const nextNotification =
          notificationQueue.remove();

        io.emit(
          "notification:new",
          nextNotification
        );
      }
    });

    socket.on("disconnect", () => {
      console.log(
        `User disconnected: ${socket.id}`
      );
    });
  });
};

export default notificationQueue;