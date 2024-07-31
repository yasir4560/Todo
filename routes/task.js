import express from 'express';
import { newTask, myTask, updateTask, deleteTask  } from '../controllers/task.js';
import { isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();


router.post('/new',isAuthenticated, newTask);
router.get('/all',isAuthenticated, myTask);
router.route('/:id')
.put(isAuthenticated, updateTask)
.delete( isAuthenticated, deleteTask);

export default router;