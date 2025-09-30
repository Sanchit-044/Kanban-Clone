import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error("auth error:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default auth;