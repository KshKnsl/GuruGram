<<<<<<< HEAD
import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
=======
import { Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ProfileCompletion from './components/ProfileComponents/ProfileCompletion'
>>>>>>> e0c782591852abf580f82615b166e81be93fadca

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page Components
import Home from "./Pages/LandingPage/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import Call from "./components/Call/Call";
import MentorChatPage from "./Pages/MentorChat";

// Article Related Components
import Article from "./Pages/Articles/[id]";
import ArticlesPage from "./Pages/Articles";
import ArticleEditor from "./components/Articles/ArticleEditor";

// Profile Components
<<<<<<< HEAD
import MenteeProfile from "./components/ProfileComponents/mentee";
import MentorProfile from "./components/ProfileComponents/mentor";

import "./App.css";
import AllMentors from "./Pages/AllMentors";
import axios from "axios";
=======
import MenteeProfile from './components/ProfileComponents/mentee'
import MentorProfile from './components/ProfileComponents/mentor'
import ViewMenteeProfile from './components/ProfileComponents/ViewMenteeProfile'
import ViewMentorProfile from './components/ProfileComponents/ViewMentorProfile'
>>>>>>> e0c782591852abf580f82615b166e81be93fadca

interface ArticleType {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  commentCount: number;
  likes: number;
  comments: {
    id: string;
    author: string;
    content: string;
    date: string;
  }[];
}

export default function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [articles, setArticles] = useState<ArticleType[]>([
    {
      id: "1",
      title: "Getting Started with React",
      content: "Full content here...",
      excerpt:
        "Learn the basics of React and start building your first component.",
      author: "Jane Doe",
      date: "2023-05-15",
      commentCount: 5,
      likes: 10,
      comments: [],
    },
    {
      id: "2",
      title: "Advanced TypeScript Techniques",
      content: "Full content here...",
      excerpt:
        "Explore advanced TypeScript features to write more robust code.",
      author: "John Smith",
      date: "2023-05-10",
      commentCount: 3,
      likes: 7,
      comments: [],
    },
    {
      id: "3",
      title: "Mastering CSS Grid Layout",
      content: "Full content here...",
      excerpt: "Dive deep into CSS Grid and create complex layouts with ease.",
      author: "Emily Johnson",
      date: "2023-05-20",
      commentCount: 7,
      likes: 15,
      comments: [],
    },
    {
      id: "4",
      title: "Introduction to GraphQL",
      content: "Full content here...",
      excerpt:
        "Learn how GraphQL can simplify your API and improve performance.",
      author: "Michael Brown",
      date: "2023-05-18",
      commentCount: 4,
      likes: 12,
      comments: [],
    },
  ]);

  // Theme handlers
  const darkTheme = () => setThemeMode("dark");
  const lightTheme = () => setThemeMode("light");

  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  // Article handlers

  const handleNewArticle = async (article: { title: string; content: string }) => {
    try {
      const response = await axios.post('/api/articles', article);
      setArticles([...articles, response.data]);
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const article = articles.find(article => article.id === id);
      if (article) {
        await axios.put(`localhost:5000/api/articles/${id}`, { likes: article.likes + 1 });
      }
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? { ...article, likes: article.likes + 1 } : article
        )
      );
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const location = useLocation();

  return (
    <AuthProvider>
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
          <Header />
          <main className="flex-grow pt-16">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/mentor-chat" element={<MentorChatPage />} />
              <Route path="/all/mentors" element={<AllMentors />} />

              {/* Profile Routes */}
              <Route path="/profile" element={<MenteeProfile />} />
              <Route path="/profile/mentor" element={<MentorProfile />} />
<<<<<<< HEAD

=======
              <Route path="/profile/mentee/:id" element={<ViewMenteeProfile />} />
              <Route path="/profile/mentor/:id" element={<ViewMentorProfile />} />
              <Route path="/complete-profile" element={<ProfileCompletion />} />
              
>>>>>>> e0c782591852abf580f82615b166e81be93fadca
              {/* Feature Routes */}
              <Route path="/call" element={<Call />} />

              {/* Article Routes */}
              <Route
                path="/articles/new"
                element={<ArticleEditor onSubmit={handleNewArticle} />}
              />
              <Route
                path="/articles/:id"
                element={<Article articles={articles} />}
              />
              <Route
                path="/articles"
                element={
                  <ArticlesPage articles={articles} onLike={handleLike} />
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {location.pathname === "/" && <Footer />}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
