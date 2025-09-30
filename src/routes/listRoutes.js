import express from 'express';
import { createList, getLists, updateList } from '../controllers/listController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createList);
router.get('/:boardId', auth, getLists);
router.put('/:id', auth, updateList);

export default router;
