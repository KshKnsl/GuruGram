import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Article from './Pages/Articles/[id].tsx'
import ArticlesPage from './Pages/Articles'
import ArticleEditor from './components/Articles/ArticleEditor'
import MenteeProfile from './components/ProfileComponents/mentee.tsx'
import MentorProfile from './components/ProfileComponents/mentor.tsx'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/LandingPage/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import NotFound from './Pages/NotFound'
import Call from './components/Call/Call'
import './App.css'

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

function App() {
  const [themeMode, setThemeMode] = useState('light')
  const [articles, setArticles] = useState<ArticleType[]>([
    {
      id: '1',
      title: 'Getting Started with React',
      content: 'Full content here...',
      excerpt: 'Learn the basics of React and start building your first component.',
      author: 'Jane Doe',
      date: '2023-05-15',
      commentCount: 5,
      likes: 10,
      comments: [],
    },
    {
      id: '2',
      title: 'Advanced TypeScript Techniques',
      content: 'Full content here...',
      excerpt: 'Explore advanced TypeScript features to write more robust code.',
      author: 'John Smith',
      date: '2023-05-10',
      commentCount: 3,
      likes: 7,
      comments: [],
    },
    {
      id: '3',
      title: 'Mastering CSS Grid Layout',
      content: 'Full content here...',
      excerpt: 'Dive deep into CSS Grid and create complex layouts with ease.',
      author: 'Emily Johnson',
      date: '2023-05-20',
      commentCount: 7,
      likes: 15,
      comments: [],
    },
    {
      id: '4',
      title: 'Introduction to GraphQL',
      content: 'Full content here...',
      excerpt: 'Learn how GraphQL can simplify your API and improve performance.',
      author: 'Michael Brown',
      date: '2023-05-18',
      commentCount: 4,
      likes: 12,
      comments: [],
    },
  ]);

  const darkTheme = () => {
    setThemeMode('dark')
  }
  const lightTheme = () => {
    setThemeMode('light')
  }
  useEffect(() => {
    document.querySelector('html')?.classList.remove('dark','light')
    document.querySelector('html')?.classList.add(themeMode)
  }, [themeMode])

  const handleNewArticle = (article: { title: string; content: string }) => {
    const newArticle: ArticleType = {
      id: String(articles.length + 1),
      ...article,
      excerpt: article.content.slice(0, 100) + '...',
      author: 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      commentCount: 0,
      likes: 0,
      comments: [],
    };
    setArticles([...articles, newArticle]);
    // Redirect to the articles list page after submission
    window.location.href = '/articles';
  };

  const handleLike = (id: string) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article.id === id ? { ...article, likes: article.likes + 1 } : article
      )
    );
  };

return (
  <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
    <div className='h-full w-full dark:bg-gray-900 mt-8'>
      <Navbar />
      <div className='px-auto'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<MenteeProfile />} />
          <Route path="profilementor" element={<MentorProfile />} />
          <Route path="call" element={<Call />} />
          <Route path="articles/new" element={<ArticleEditor onSubmit={handleNewArticle} />} />
          <Route path="articles/:id" element={<Article articles={articles} />} />
          <Route path="articles" element={<ArticlesPage articles={articles} onLike={handleLike} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </ThemeProvider>
);
}
export default App