import express from 'express';
import { specialcreatePickup, specialgetPickup, acceptSpecialPickup, rejectSpecialPickup } from '../controllers/specialpickup.controller.js';

const router = express.Router();

router.post('/createspecial', specialcreatePickup);
router.get('/gets', specialgetPickup);
router.post('/accept/:id', acceptSpecialPickup);
router.post('/reject/:id', rejectSpecialPickup);

export default router;
