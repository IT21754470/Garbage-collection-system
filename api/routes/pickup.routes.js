import express from 'express';
import { createPickup ,getSchedule} from '../controllers/pickup.controller.js';

const router = express.Router();

router.post('/create', createPickup);
router.get('/get', getSchedule);

export default router;
