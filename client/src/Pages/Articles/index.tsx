import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ArticleList from '../../components/Articles/ArticleList';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  commentCount: number;
  likes: number;
}

const ArticlesPage = () => {
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and start building your first component.',
      author: 'Jane Doe',
      date: '2023-05-15',
      commentCount: 5,
      likes: 10,
    },
    {
      id: '2',
      title: 'Advanced TypeScript Techniques',
      excerpt: 'Explore advanced TypeScript features to write more robust code.',
      author: 'John Smith',
      date: '2023-05-10',
      commentCount: 3,
      likes: 7,
    },
    {
      id: '3',
      title: 'Mastering CSS Grid Layout',
      excerpt: 'Dive deep into CSS Grid and create complex layouts with ease.',
      author: 'Emily Johnson',
      date: '2023-05-20',
      commentCount: 7,
      likes: 15,
    },
    {
      id: '4',
      title: 'Introduction to GraphQL',
      excerpt: 'Learn how GraphQL can simplify your API and improve performance.',
      author: 'Michael Brown',
      date: '2023-05-18',
      commentCount: 4,
      likes: 12,
    },
  ]);

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleLike = (id: string) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article.id === id ? { ...article, likes: article.likes + 1 } : article
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
        </motion.div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-4 sm:mb-0"
        >
          Articles
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/articles/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
          >
            Write New Article
          </Link>
        </motion.div>
      </div>
      <ArticleList articles={articles} onLike={handleLike} />
    </motion.div>
  );
};

export default ArticlesPage;

