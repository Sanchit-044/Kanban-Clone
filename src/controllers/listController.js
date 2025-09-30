import List from '../models/list.js';
import Card from '../models/card.js';

export const createList = async (req, res) => {
  try {
    const { boardId, title } = req.body;
    if (!boardId || !title) return res.status(400).json({ error: 'boardId and title required' });

    const list = new List({ boardId, title });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getLists = async (req, res) => {
  try {
    const { boardId } = req.params;
    const lists = await List.find({ boardId });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, archived } = req.body;

    const list = await List.findById(id);
    if (!list) return res.status(404).json({ error: 'List not found' });

    if (title !== undefined) list.title = title;
    if (archived !== undefined) list.archived = archived;

    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
