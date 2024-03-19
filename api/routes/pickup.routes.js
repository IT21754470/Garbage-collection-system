import express from 'express';
import { createPickup } from '../controllers/pickup.controller';

const router = express.Router();



router.post('/create', createPickup);

export default router;
