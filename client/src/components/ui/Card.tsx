import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-900 border border-amber-500/20 ${className}`} {...props}>
      {children}
    </div>
  )
}
