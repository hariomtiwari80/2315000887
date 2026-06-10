import Notification from "../models/Notification.js";

export const createNotificationService = async (
  notificationData
) => {
  const notification = await Notification.create(
    notificationData
  );

  return notification;
};

export const getNotificationsService = async (
  userId
) => {
  const notifications = await Notification.find({
    userId,
  }).sort({ createdAt: -1 });

  return notifications;
};

export const markAsReadService = async (id) => {
  const notification =
    await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

  if (!notification) {
    throw new Error("Notification not found");
  }

  return notification;
};

export const deleteNotificationService = async (
  id
) => {
  const notification =
    await Notification.findByIdAndDelete(id);

  if (!notification) {
    throw new Error("Notification not found");
  }

  return notification;
};