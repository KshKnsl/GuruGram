const express = require("express");
const router = express.Router();

const {
  createArticle,
  deleteArticle,
  getArticlesByTags,
  getArticlesByAuthor,
  getArticlesAll,
  getArticleById
} = require("../controllers/article.controllers.js");

router.post("/createArticle", async (req, res) => {
  let result = await createArticle(req.body);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
});

router.post("/deleteArticle", async (req, res) => {
  let result = await deleteArticle(req.body);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get("/tags/:tag", async (req, res) => {
  let result = await getArticlesByTags(req, res);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get("/author/:author", async (req, res) => {
  const authorID = req.params.author;
  let result = await getArticlesByAuthor(authorID);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get("/all", async (req, res) => {
  let result = await getArticlesAll(req, res);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get("/:id", async (req, res) => {
  let result = await getArticleById(req.params.id);
  res.status(200).json(result);
});

module.exports = router;
