import jwt from "jsonwebtoken";
import Mentor from "../models/Mentor.model.js";
import Mentee from "../models/Mentee.model.js";

const protect = async (req, res, next) => {
  // Support tokens from Authorization header or x-auth-token
  const authHeader = req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET is not defined" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // Try to determine user role by checking mentor then mentee collections
    const userId = decoded.id;
    let role = null;

    const mentor = await Mentor.findById(userId).select("_id");
    if (mentor) role = "mentor";

    if (!role) {
      const mentee = await Mentee.findById(userId).select("_id");
      if (mentee) role = "mentee";
    }

    req.user = { id: userId, role };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Token is not valid", error: error.message });
  }
};

export { protect };
