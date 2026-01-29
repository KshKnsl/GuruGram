import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export default function Badge({ children, className = '', ...props }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-sm ${className}`} {...props}>
      {children}
    </span>
  )
}
