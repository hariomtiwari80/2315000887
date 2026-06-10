import Notification from "../models/Notification.js";

const TYPE_WEIGHTS = {
  placement: 3,
  result: 2,
  event: 1,
};

export const getPriorityScore = (
  notification
) => {
  const typeWeight =
    TYPE_WEIGHTS[
      notification.type?.toLowerCase()
    ] || 1;

  const createdAt = new Date(
    notification.createdAt
  ).getTime();

  const now = Date.now();

  const ageInHours =
    (now - createdAt) / (1000 * 60 * 60);

  const recencyScore = Math.max(
    0,
    24 - ageInHours
  );

  return typeWeight * 100 + recencyScore;
};

export const getTopNotifications = async (
  userId,
  limit = 10
) => {
  const notifications =
    await Notification.find({
      userId,
      isRead: false,
    });

  const prioritizedNotifications =
    notifications
      .map((notification) => ({
        ...notification.toObject(),
        priorityScore:
          getPriorityScore(notification),
      }))
      .sort(
        (a, b) =>
          b.priorityScore -
          a.priorityScore
      )
      .slice(0, limit);

  return {
    notifications:
      prioritizedNotifications,
    count:
      prioritizedNotifications.length,
  };
};

export const updatePriorityInbox = async (
  notification
) => {
  const priorityScore =
    getPriorityScore(notification);

  return {
    ...notification.toObject?.() ??
      notification,
    priorityScore,
  };
};