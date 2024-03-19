import express from 'express';
import { createPickup } from '../controllers/pickup.controller';

const router = express.Router();

router.get('/test',test)

router.post('/create', createPickup);

export default router;
