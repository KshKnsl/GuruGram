import React from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import CommentSection from './CommentSection'

interface ArticlePageProps {
  title: string
  content: string
  author: string
  date: string
  comments: { id: string; author: string; content: string; date: string }[]
  onAddComment: (content: string) => void
}

const ArticlePage: React.FC<ArticlePageProps> = ({ title, content, author, date, comments, onAddComment }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold mb-4"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center text-gray-600 mb-6"
      >
        <UserCircleIcon className="w-5 h-5 mr-2" />
        <span className="mr-4">{author}</span>
        <CalendarIcon className="w-5 h-5 mr-2" />
        <span>{date}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: content }}
      ></motion.div>
      <CommentSection comments={comments} onAddComment={onAddComment} />
    </motion.div>
  )
}

export default ArticlePage

