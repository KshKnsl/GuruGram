import React from 'react';
import { useParams } from 'react-router-dom';
import ArticlePage from '../../components/Articles/ArticlePage';

const Article = () => {
  const { id } = useParams();

  // This would typically come from an API or database
  const article = {
    title: 'Getting Started with React',
    content: '<p>This is the full content of the article...</p>',
    author: 'Jane Doe',
    date: '2023-05-15',
    comments: [
      { id: '1', author: 'John Smith', content: 'Great article!', date: '2023-05-16' },
      { id: '2', author: 'Alice Johnson', content: 'Very helpful, thanks!', date: '2023-05-17' },
    ],
  };

  const handleAddComment = (content: string): void => {
    // This will send the comment to an API
    console.log('New comment:', content);
  };

  return <ArticlePage {...article} onAddComment={handleAddComment} />;
};

export default Article;