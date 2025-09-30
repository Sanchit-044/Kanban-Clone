import Board from "../models/board.js";
import User from "../models/users.js";

export const createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Board name is required" });

    const board = new Board({
      name,
      description: description || "",
      createdBy: req.user._id,
      members: [{ user: req.user._id, role: "owner" }],
    });

    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ "members.user": req.user._id });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addMember = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { userId, role } = req.body;

    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ error: "Board not found" });

    board.members.push({ user: userId, role: role || "member" });
    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
