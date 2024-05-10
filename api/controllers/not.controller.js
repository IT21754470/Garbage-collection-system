import Notification from '../models/notification.model.js';

export const getNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

export const getLatestNotification = async (req, res) => {
  const { userId } = req.params;

  try {
    const latestNotification = await Notification.findOne({ userId })
      .sort({ createdAt: -1 }); // Get the latest notification by creation time

    if (!latestNotification) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json(latestNotification); // Return the latest notification
  } catch (error) {
    console.error('Error fetching the latest notification:', error);
    res.status(500).json({ error: 'Error fetching the latest notification' });
  }
};

export const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;

  try {
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Error deleting notification' });
  }
}