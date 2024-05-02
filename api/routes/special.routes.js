import express from 'express';
import { specialcreatePickup, specialgetPickup, acceptSpecialPickup, rejectSpecialPickup } from '../controllers/specialpickup.controller.js';
import { getNotifications} from '../controllers/not.controller.js';

const router = express.Router();

router.post('/createspecial', specialcreatePickup);
router.get('/gets', specialgetPickup);
router.post('/accept/:id', acceptSpecialPickup);
router.post('/reject/:id', rejectSpecialPickup);
router.get('/notifications/:userId', getNotifications);

export default router;
