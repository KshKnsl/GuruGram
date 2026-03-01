import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.06)_0%,transparent_70%)]" />

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="w-8 h-0.5 bg-amber-500 mx-auto" />
        </motion.div>

        <motion.p
          className="text-xs font-medium tracking-widest uppercase text-amber-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Error
        </motion.p>

        <motion.h1
          className="font-serif-display text-[10rem] md:text-[14rem] font-black leading-none tracking-tight text-gray-900 dark:text-stone-100 mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <em className="not-italic text-amber-500">4</em>
          0
          <em className="not-italic text-amber-500">4</em>
        </motion.h1>

        <motion.p
          className="font-serif-display text-xl font-bold italic text-gray-600 dark:text-gray-400 mb-10 -mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          This page isn't in our library.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="clip-skew flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-gray-900 text-xs font-medium tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,168,76,0.3)]"
          >
            <Home className="h-3.5 w-3.5" />
            Return Home
          </Link>
          <Link
            to="/all/mentors"
            className="flex items-center gap-2 px-8 py-3.5 border border-amber-500/30 text-gray-700 dark:text-stone-300 hover:border-amber-500 hover:text-amber-500 text-xs font-medium tracking-widest uppercase transition-all duration-200"
          >
            Browse Mentors
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;