import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    title: { type: String, required: true },
    position: { type: Number, default: 1000 },
    wipLimit: { type: Number, default: null },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("List", listSchema);
