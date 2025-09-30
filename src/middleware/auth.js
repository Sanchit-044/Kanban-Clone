import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    console.error("auth error:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
