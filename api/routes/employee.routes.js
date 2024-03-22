import express from 'express';
import { createEmployee ,getEmployee,updateEmployee,deleteEmployee} from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/create', createEmployee);
router.get('/get', getEmployee);
router.put('/updates/:id',  updateEmployee)
router.delete('/deletes/:id',deleteEmployee);

export default router;