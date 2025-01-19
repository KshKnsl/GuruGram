const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const { upload } = require("../middlewares/multer.js");
const uploadImage  = require("../utils/uploadImage.js");
const { createMentor, findMentor, updateMentor, loginMentor, googleLogin, findMentorByEmail
} = require("../controllers/mentor.controllers.js");
const router = express.Router();
const Mentor = require("../models/Mentor.model.js");

router.post("/addMentor", async (req, res) => {
  let result = await createMentor(req.body);
  if (result.success) 
    res.status(201).send(result);
  else
    res.status(400).send(result);
});

router.post("/login", async (req, res) => {
  let result = await loginMentor(req.body);
  if (result.success) 
    res.status(200).send(result);
  else
    res.status(404).send({message: "Mentor not found"});
});

router.put("/updateMentor", async (req, res) => {
  let result = await updateMentor(req.body);
  if (result.success) {
    res.status(201).send(result);
  } else {
    res.status(400).send(result);
  }
});

router.get("/:id", async (req, res) => {
  let foundMentor = await findMentor(req.params.id);
  res.send(foundMentor);
});

router.get("/email/:email", async (req, res) => {
  let foundMentor = await findMentorByEmail(req.params.email);
  res.send(foundMentor);
});

router.post("/reading", async (req, res) => {
  let foundMentor = await Mentor.findById(req.body.mentorId);
  const articleId = req.body.articleId;
  foundMentor.readArticles = [...new Set([...foundMentor?.readArticles || [], articleId])];
  foundMentor.lastRead = articleId;
  await foundMentor.save();
  res.send({ success: true, message: "Article added to reading list" });
});

router.post("/:id/uploadAvatar", upload.single("image"), async (req, res) => {
  try {
    const mentorId = req.params.id;
    const foundMentor = await findMentor(mentorId);
    if (!foundMentor || !req.file) 
      return res.status(404).send({ success: false, message: "Not found" });
    foundMentor.avatar = await  uploadImage(`uploads/${req.params.id}_${req.file.originalname}`,req.params.id);
    await updateMentor(foundMentor);
    res.status(200).send({success: true, message: "Avatar uploaded successfully",newAvatar : foundMentor.avatar});
  } 
  catch (error) {
    res.status(500).send({ success: false, message: `Internal server error${error}`, });
  }
});

router.post("/google-login", async (req, res) => {
  console.log("Google login request:", req.body);
  const { token } = req.body;
  try {
    const googleResponse = await googleLogin(token);
    if (googleResponse.success)
      res.status(200).json(googleResponse); 
    else
      res.status(400).send({ message: `Invalid Google token. ${googleResponse}` });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(400).send("Invalid Google token.");
  }
});

module.exports = router;
