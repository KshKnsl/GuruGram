import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, MessageSquare, Heart, PenLine } from 'lucide-react';
import MentorName from '../../components/ui/MentorName';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  commentCount: number;
  likes: number;
}


interface ArticleCardProps {
  id?: string
  _id?: string
  title: string
  content: string
  author: string
  date: string
  commentCount: number
  likes: number
  onLike: (id: string) => void
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, _id, title, content, author, date, commentCount, likes, onLike }) => {
  const articleId = id || _id
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    const newIsLiked = !isLiked
    setIsLiked(newIsLiked)
    setLikeCount(likeCount + (newIsLiked ? 1 : -1))
    if (articleId) onLike(articleId)
  }

  return (
    <Link
      to={`/articles/${articleId}`}
      className="group flex flex-col overflow-hidden border border-amber-500/20 bg-white dark:bg-gray-900 hover:border-amber-500/50 hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-amber-500/60 to-transparent" />
      <div className="p-7 flex flex-col flex-1">
        <span className="text-xs font-medium tracking-widest uppercase text-amber-500 mb-3">
          <MentorName id={author} />
        </span>
        <h2 className="font-serif-display text-xl font-bold mb-3 text-gray-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 flex-1 mb-6">
          {content.slice(0, 180)}{content.length > 180 ? '…' : ''}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {commentCount}
            </span>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? 'text-amber-500' : 'hover:text-amber-500'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-amber-500 text-amber-500' : ''}`} />
              {likeCount}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── ArticlesPage ─────────────────────────────────────────────────────────────

interface Article {
  id: string
  title: string
  content: string
  author: string
  date: string
  commentCount: number
  likes: number
}

interface ArticlesPageProps {
  articles: Article[];
  onLike: (id: string) => void;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ articles, onLike }) => {
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 px-6 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto">

        {message && (
          <div className="mb-8 px-5 py-3 border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm tracking-wide">
            {message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Knowledge Hub</span>
            </div>
            <h1 className="font-serif-display text-4xl lg:text-5xl font-black tracking-tight leading-tight text-gray-900 dark:text-stone-100">
              Expert <em className="not-italic text-amber-500">articles</em> &amp; insights
            </h1>
          </div>
          <Link
            to="/articles/new"
            className="clip-skew inline-flex items-center gap-2 px-8 py-4 text-xs font-medium tracking-widest uppercase bg-amber-500 hover:bg-amber-400 text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)] shrink-0"
          >
            <PenLine className="w-3.5 h-3.5" />
            Write Article
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-24 border border-amber-500/15">
            <p className="text-xs tracking-widest uppercase text-gray-400">No articles yet. Be the first to write one.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div key={article.id} className="relative">
                <ArticleCard {...article} onLike={onLike} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
