import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const tokenSubSchema = new Schema({
  token: { type: String, required: true }
}, { _id: false });

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    tokens: { type: [tokenSubSchema], default: [] }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const secret = process.env.JWT_SECRET;

  const payload = { _id: this._id.toString(), email: this.email };
  const token = jwt.sign(payload, secret, { expiresIn });

  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.methods.checkPassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.removeToken = async function (token) {
  this.tokens = this.tokens.filter((t) => t.token !== token);
  await this.save();
};

const User = mongoose.model("User", userSchema);
export default User;
