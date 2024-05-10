import express from 'express';
import { specialcreatePickup, specialgetPickup, acceptSpecialPickup, rejectSpecialPickup } from '../controllers/specialpickup.controller.js';
import { getNotifications,getLatestNotification,deleteNotification} from '../controllers/not.controller.js';

const router = express.Router();

router.post('/createspecial', specialcreatePickup);
router.get('/gets', specialgetPickup);
router.post('/accept/:id', acceptSpecialPickup);
router.post('/reject/:id', rejectSpecialPickup);
router.get('/notifications/:userId', getNotifications);
//router.get('/notifications/unread/:userId',getUnreadNotifications);
router.get('/notifications/latest/:userId', getLatestNotification);
router.delete('/notifications/:notificationId', deleteNotification);
export default router;
