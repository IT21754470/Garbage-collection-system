import express from 'express';
import { specialcreatePickup ,specialgetPickup} from '../controllers/specialpickup.controller.js';
import { deleteSchedule, updateSchedule } from '../controllers/pickup.controller.js';

const router = express.Router();

router.post('/createspecial', specialcreatePickup);
router.get('/gets', specialgetPickup);


export default router;