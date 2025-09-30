import Card from '../models/card.js';

export const createCard = async (req, res) => {
  try {
    const { boardId, listId, title, description } = req.body;
    if (!boardId || !listId || !title) return res.status(400).json({ error: 'boardId, listId and title required' });

    const card = new Card({
      boardId,
      listId,
      title,
      description: description || 'title',
      createdBy: req.user._id
    });

    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCards = async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await Card.find({ listId });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, archived } = req.body;

    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    if (title !== undefined) card.title = title;
    if (description !== undefined) card.description = description;
    if (archived !== undefined) card.archived = archived;

    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
