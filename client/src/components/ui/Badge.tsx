import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export default function Badge({ children, className = '', ...props }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 border border-amber-500/20 bg-amber-500/8 text-xs font-medium text-amber-700 dark:text-amber-400 ${className}`} {...props}>
      {children}
    </span>
  )
}
