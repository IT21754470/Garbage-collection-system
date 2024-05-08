import express from 'express';
import { createRespond, getRespond, getRespondsByPost, updateRespond, deleteRespond } from '../controllers/respond.controller.js';

const router = express.Router();

router.post('/create', createRespond);
router.get('/get', getRespond);
router.put('/updates/:id', updateRespond)
router.delete('/deletes/:id', deleteRespond);
router.get('/get/:id', getRespondsByPost);


export default router;
