import { useParams } from 'react-router-dom';
import ArticlePage from '../../components/Articles/ArticlePage';

interface ArticleType {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  commentCount: number;
  likes: number;
  comments: { id: string; author: string; content: string; date: string }[];
}

interface ArticleProps {
  articles?: ArticleType[];
}

const Article = ({ articles }: ArticleProps) => {
  useParams();

  // Dummy data
  const dummyArticle = {
    id: '1',
    title: 'Getting Started with React',
    content: '<p>This is the full content of the article...</p>',
    excerpt: 'This is a short excerpt of the article...',
    author: 'Jane Doe',
    date: '2023-05-15',
    commentCount: 2,
    likes: 10,
    comments: [
      { id: '1', author: 'John Smith', content: 'Great article!', date: '2023-05-16' },
      { id: '2', author: 'Alice Johnson', content: 'Very helpful, thanks!', date: '2023-05-17' },
    ],
  };

  const article = dummyArticle;

  article.comments = article.comments || [];

  const handleAddComment = (content: string): void => {
    console.log('New comment:', content);
  };

  return <ArticlePage {...article} onAddComment={handleAddComment} />;
};

export default Article;