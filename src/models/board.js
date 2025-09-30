import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "name" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, default: "member" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);
