import express from 'express';
import { createCard, getCards, updateCard } from '../controllers/cardController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createCard);
router.get('/:listId', auth, getCards);
router.put('/:id', auth, updateCard);

export default router;
