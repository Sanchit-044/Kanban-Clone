import express from 'express';
import { createCard, getCards, updateCard, deleteCard } from '../controllers/cardController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createCard);
router.get('/', auth, getCards);
router.put('/:id', auth, updateCard);
router.delete("/:id", auth, deleteCard);

export default router;
