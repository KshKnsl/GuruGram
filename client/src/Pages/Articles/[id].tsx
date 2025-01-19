import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticlePage from '../../components/Articles/ArticlePage';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`localhost:5000/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  const handleAddComment = async (content: string) => {
    try {
      const response = await axios.post(`localhost:5000/api/articles/${id}/comments`, { content });
      setArticle({ ...article, comments: [...article.comments, response.data] });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return <ArticlePage {...article} onAddComment={handleAddComment} />;
};

export default Article;
