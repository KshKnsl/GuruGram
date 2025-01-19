const express = require("express")
const { protect } = require( "../middlewares/authMiddleware.js");
const { getMessages, getUsersForSidebar, sendMessage } = require( "../controllers/message.controller.js");

const router = express.Router();

router.get("/users", getUsersForSidebar);
router.get("/:id", protect, getMessages);

router.post("/send/:id", protect, sendMessage);

module.exports = router;