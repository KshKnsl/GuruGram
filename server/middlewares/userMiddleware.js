import { Request, Response, NextFunction } from "express";
import Mentor from "../models/Mentor.model"; // Mentor model
import Mentee from "../models/Mentee.model"; // Mentee model

export const userMiddleware = async (req, res, next) => {
  try {
    // Get user ID and role from localStorage (mocked for server-side)
    const userId = localStorage.getItem("_id");
    const userRole = localStorage.getItem("role");     

    if (!userId || !userRole) {
      return res.status(401).json({ message: "Unauthorized - Missing user details" });
    }

    let user;

    if (userRole === "mentor") {
      user = await Mentor.findById(userId);
    } else if (userRole === "mentee") {
      user = await Mentee.findById(userId);
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user data to the request object
    req.user = {
      id: user._id,
      email: user.email,
      role: userRole,
    };

    next();
  } catch (error) {
    console.error("Error in userMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
