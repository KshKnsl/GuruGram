import { useEffect, useState } from 'react';
import type React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, Send } from 'lucide-react';
import MentorName from '../../components/ui/MentorName';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Textarea } from '@/components/ui/textarea';

// ─── CommentSection ───────────────────────────────────────────────────────────

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-16 lg:mt-0">
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
        <span className="text-xs font-medium tracking-widest uppercase text-amber-500">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </span>
      </div>

      <div className="space-y-4 mb-10">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-6 border border-amber-500/15 bg-stone-50 dark:bg-gray-900"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-stone-100">{comment.author}</span>
              <span className="text-xs text-gray-400 ml-auto">{formatDate(comment.date)}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 pl-9">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-xs tracking-widest uppercase text-gray-400 text-center py-8 border border-amber-500/10">
            No comments yet. Start the conversation.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-amber-500/20 pt-8">
        <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">
          Add a comment
        </label>
        <Textarea
          className="w-full px-4 py-3 text-sm bg-transparent border border-amber-500/20 text-gray-900 dark:text-stone-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
          rows={4}
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="default" size="sm" className="mt-3 clip-skew inline-flex items-center gap-2 px-7 py-3" type="submit">
          <Send className="w-3 h-3" />
          Post Comment
        </Button>
      </form>
    </div>
  );
};

// ─── Article Page ─────────────────────────────────────────────────────────────

interface ArticleType {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  comments: { id: string; author: string; content: string; date: string; userId: string }[];
}

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleAddComment = async (content: string) => {
    const userId = localStorage.getItem('email');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${id}/comments`, { content, userId });
      setArticle({ ...article!, comments: [...article!.comments, response.data] });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!article) return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="space-y-4 w-full max-w-2xl px-6">
        <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-64 w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 px-6 md:px-16 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[1fr_350px] lg:gap-16 lg:items-start">

        {/* Left: Article content */}
        <div>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
            <span className="text-xs font-medium tracking-widest uppercase text-amber-500">
              <MentorName id={article.author} />
            </span>
          </div>

          <h1 className="font-serif-display text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6 text-gray-900 dark:text-stone-100">
            {article.title}
          </h1>

          <div className="flex items-center gap-5 text-xs text-gray-400 dark:text-gray-500 mb-12 pb-8 border-b border-amber-500/20">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.date)}
            </span>
          </div>

          {/* Body */}
          <div
            className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert
              prose-headings:font-serif-display prose-headings:font-bold prose-headings:text-gray-900 prose-headings:dark:text-stone-100
              prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:dark:text-stone-100
              prose-blockquote:border-l-amber-500 prose-blockquote:text-gray-500
              prose-code:bg-amber-500/10 prose-code:text-amber-700 prose-code:dark:text-amber-400 prose-code:px-1"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Comment section — shown inline on mobile */}
          <div className="lg:hidden">
            <CommentSection comments={article.comments} onAddComment={handleAddComment} />
          </div>
        </div>

        {/* Right: Comment section sticky sidebar — desktop only */}
        <div className="hidden lg:block lg:sticky lg:top-8">
          <CommentSection comments={article.comments} onAddComment={handleAddComment} />
        </div>

      </div>
    </div>
  );
};

export default Article;

