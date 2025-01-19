import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarIcon, ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface ArticleCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  commentCount: number
  likes: number
  onLike: (id: string, isLiked: boolean) => void
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, excerpt, author, date, commentCount, likes, onLike }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    const newIsLiked = !isLiked
    setIsLiked(newIsLiked)
    setLikeCount(likeCount + (newIsLiked ? 1 : -1))
    onLike(id, newIsLiked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link to={`/articles/${id}`} className="text-blue-600 hover:text-blue-800 transition duration-300">
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-500">
          <span className="mb-2 sm:mb-0">{author}</span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {date}
            </span>
            <span className="flex items-center">
              <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
              {commentCount}
            </span>
            <button
              onClick={handleLike}
              className="flex items-center text-red-500 hover:text-red-600 transition duration-300"
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5 mr-1" />
              ) : (
                <HeartIcon className="w-5 h-5 mr-1" />
              )}
              {likeCount}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ArticleCard
