import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface ArticleEditorProps {
  onSubmit: (article: { title: string; content: string; author: string | null }) => void
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [author, setAuthor] = useState<string | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    setIsMentor(role === 'mentor')
    setAuthor(localStorage.getItem('_id'));
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      setIsPublishing(true)
      try {
        // Simulate API call to publish the article
        await new Promise(resolve => setTimeout(resolve, 1500))
        onSubmit({ title, content, author })
        // Redirect to the articles list page after successful publication
        navigate('/articles', { state: { message: 'Article published successfully!' } })
      } catch (error) {
        console.error('Error publishing article:', error)
        alert('Failed to publish article. Please try again.')
      } finally {
        setIsPublishing(false)
      }
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto px-4 py-8 dark:bg-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Write a New Article</h2>
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white"
          required
        ></textarea>
      </div>
      {isMentor && (
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
          disabled={isPublishing}
        >
          {isPublishing ? 'Publishing...' : 'Publish Article'}
        </motion.button>
      )}
    </motion.form>
  )
}

export default ArticleEditor