import Mentor from "../models/Mentor.model.js";
import Article from "../models/Article.model.js";

async function createArticle(data) {
  try {
    const newArticle = new Article({
      title: data.title,
      desc: data.desc,
      content: data.content,
      author: data.author,
      tags: data.tags,
      publishedAt: data.publishedAt || null,
    });

    await newArticle.save();

    const user = await Mentor.findById(data.author);
    if (user) {
      try {
        user.articles.push(newArticle._id);
        user.points += 30;
        await user.save();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }

    return {
      success: true,
      message: "Article created successfully",
      article: newArticle,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error while creating article: ${error.message}`,
    };
  }
}

// Get an article by ID
async function getArticleById(id) {
  try {
    const article = await Article.findById(id).populate("author contributors");
    if (!article) {
      return { success: false, message: "Article not found" };
    }
    return { success: true, article };
  } catch (error) {
    return {
      success: false,
      message: `Error fetching article: ${error.message}`,
    };
  }
}

async function deleteArticle(id) {
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return { success: false, message: "Article not found" };
    }
    return { success: true, message: "Article deleted successfully" };
  } catch (error) {
    return {
      success: false,
      message: `Error while deleting article: ${error.message}`,
    };
  }
}

async function getArticlesByTags(tags) {
  try {
    const articles = await Article.find({ tags: { $in: tags } });
    return { success: true, articles };
  } catch (error) {
    return {
      success: false,
      message: `Error fetching articles by tags: ${error.message}`,
    };
  }
}

async function getArticlesByAuthor(author) {
  try {
    const articles = await Article.find({ author }).populate(
      "author"
    );
    return { success: true, articles };
  } catch (error) {
    return {
      success: false,
      message: `Error fetching articles by author: ${error.message}`,
    };
  }
}

async function getArticlesAll() {
  try {
    const articles = await Article.find().populate("author");
    return { success: true, articles };
  } catch (error) {
    return {
      success: false,
      message: `Error fetching all articles: ${error.message}`,
    };
  }
}


export {
  createArticle,
  getArticleById,
  deleteArticle,
  getArticlesByTags,
  getArticlesByAuthor,
  getArticlesAll
};
