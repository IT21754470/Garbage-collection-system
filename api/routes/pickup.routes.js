import express from 'express';
import { createPickup ,getSchedule,updateSchedule,deleteSchedule} from '../controllers/pickup.controller.js';

const router = express.Router();

router.post('/create', createPickup);
router.get('/get', getSchedule);
router.put('/updates/:id',  updateSchedule)
router.delete('/deletes/:id',deleteSchedule);

export default router;
