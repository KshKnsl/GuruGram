import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './Layout'
import Home from "./components/Home/Home.js"
import AboutUs from './components/AboutUs/AboutUs.js'
import MainLayout from './components/ProfileComponents/MainLayout.tsx'
import RoomPage from './Pages/VideoCallPages/Room/index.tsx'
import SignUpUser from './Pages/SignUpPage/User/index.tsx';
import Article from './Pages/Articles/[id].tsx'
import ArticlesPage from './Pages/Articles'
import ArticleEditor from './components/Articles/ArticleEditor'
import MenteeProfile from './components/ProfileComponents/mentee.tsx';
import MentorProfile from './components/ProfileComponents/mentor.tsx'
import VideoHome from './Pages/VideoCallPages/Home/index.tsx'
import { ThemeProvider } from './context/ThemeContext'

interface ArticleType {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  commentCount: number;
  likes: number;
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

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'about',
          element: <AboutUs />
        },
        {
          path: 'profilementor',
          element: <MentorProfile />
        },
        {
          path: '/articles/new',
          element: <ArticleEditor onSubmit={handleNewArticle} />
        },
        {
          path: 'wprofile',
          element: <MainLayout />
        },
        {
          path: 'articles/:id',
          element: <Article articles={articles} />
        },
        {
          path: 'articles',
          element: <ArticlesPage articles={articles} onLike={handleLike} />
        },
        {
          path: 'call',
          element: <VideoHome />
        },
        {
          path: 'room/:roomId',
          element: <RoomPage />
        },
        {
          path: 'profile',
          element: <MenteeProfile />
        },
        {
          path: '/signUpUser',
          element: <SignUpUser />
        }
      ]
    }
  ])

  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <RouterProvider router={router} />  
    </ThemeProvider>
  )
}

export default App;

