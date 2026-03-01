import React from 'react'

export function ListGroup({ children }: { children: React.ReactNode }) {
  return <div className="bg-white dark:bg-gray-900 border border-amber-500/20 overflow-hidden">{children}</div>
}

export function ListGroupItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-4 py-3 border-b border-amber-500/20 last:border-b-0 ${className}`}>{children}</div>
}
