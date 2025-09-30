import Card from "../models/card.js";

export const createCard = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const card = new Card({
      title,
      description,
      status,
      dueDate,
      owner: req.user._id
    });
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ owner: req.user._id });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCard = async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
