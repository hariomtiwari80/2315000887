import {
  createNotificationService,
  getNotificationsService,
  markAsReadService,
  deleteNotificationService,
} from "../services/notificationService.js";

export const createNotification = async (req, res, next) => {
  try {
    const notification = await createNotificationService(req.body);

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await getNotificationsService(
      req.params.userId
    );

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const notification = await markAsReadService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    await deleteNotificationService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};