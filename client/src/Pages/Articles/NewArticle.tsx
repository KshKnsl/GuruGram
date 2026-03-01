import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, PenLine } from "lucide-react"
import axios from "axios"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<F extends (...args: any[]) => void>(fn: F, wait = 0) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}

interface NewArticleProps {
  onSubmit: (article: { title: string; content: string; author: string | null }) => void
}

const NewArticle: React.FC<NewArticleProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [author, setAuthor] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsMentor(localStorage.getItem("role") === "mentor")
    setAuthor(localStorage.getItem("_id"))

    const savedDraft = localStorage.getItem("articleDraft")
    if (savedDraft) {
      const { title: savedTitle, content: savedContent } = JSON.parse(savedDraft)
      setTitle(savedTitle)
      setContent(savedContent)
    }
  }, [])

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!content.trim()) newErrors.content = "Content is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const checkAndAwardBadges = async (authorId: string | null) => {
    if (!authorId) return
    try {
      await axios.post("/api/messages/award-badges", { authorId })
    } catch (error) {
      console.error("Error awarding badges:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsPublishing(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        onSubmit({ title, content, author })
        await checkAndAwardBadges(author)
        localStorage.removeItem("articleDraft")
        navigate("/articles", { state: { message: "Article published successfully!" } })
      } catch (error) {
        console.error("Error publishing article:", error)
      } finally {
        setIsPublishing(false)
      }
    }
  }

  const saveDraft = useCallback(
    debounce((t: string, c: string) => {
      localStorage.setItem("articleDraft", JSON.stringify({ title: t, content: c }))
    }, 1000),
    [],
  )

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    saveDraft(e.target.value, content)
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    saveDraft(title, value)
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 px-6 md:px-16 lg:px-24 py-16">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
          <span className="text-xs font-medium tracking-widest uppercase text-amber-500">New Article</span>
        </div>
        <h1 className="font-serif-display text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-12 text-gray-900 dark:text-stone-100">
          Write something <em className="not-italic text-amber-500">worth reading.</em>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div>
            <label htmlFor="title" className="block text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className={`w-full px-4 py-3 text-sm bg-transparent border text-gray-900 dark:text-stone-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors ${
                errors.title ? 'border-red-400' : 'border-amber-500/20'
              }`}
              placeholder="Your article title..."
              required
            />
            {errors.title && (
              <p className="mt-2 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="content" className="text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">
                Content
              </label>
              <button
                type="button"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-amber-500 hover:text-amber-400 transition-colors"
                aria-label={isPreviewMode ? 'Edit mode' : 'Preview mode'}
              >
                {isPreviewMode ? <><EyeOff size={14} /> Edit</> : <><Eye size={14} /> Preview</>}
              </button>
            </div>
            {isPreviewMode ? (
              <div
                className="prose prose-sm max-w-none p-5 border border-amber-500/20 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 min-h-64
                  dark:prose-invert prose-a:text-amber-500 prose-blockquote:border-l-amber-500 prose-headings:font-serif-display"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <textarea
                id="content"
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={14}
                className={`w-full px-4 py-3 text-sm bg-transparent border text-gray-900 dark:text-stone-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors resize-none ${
                  errors.content ? 'border-red-400' : 'border-amber-500/20'
                }`}
                placeholder="Write your article here..."
              />
            )}
            {errors.content && (
              <p className="mt-2 text-xs text-red-500">{errors.content}</p>
            )}
          </div>

          {isMentor ? (
            <button
              type="submit"
              disabled={isPublishing}
              className="clip-skew inline-flex items-center gap-2 px-9 py-4 text-xs font-medium tracking-widest uppercase bg-amber-500 hover:bg-amber-400 text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <PenLine className="w-3.5 h-3.5" />
              {isPublishing ? 'Publishing...' : 'Publish Article'}
            </button>
          ) : (
            <div className="px-5 py-4 border border-amber-500/30 bg-amber-500/5">
              <p className="text-xs tracking-widest uppercase text-amber-600 dark:text-amber-400">
                Only mentors can publish articles. Sign up as a mentor to contribute.
              </p>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}

export default NewArticle
