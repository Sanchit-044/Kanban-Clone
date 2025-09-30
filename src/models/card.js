import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
    dueDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
