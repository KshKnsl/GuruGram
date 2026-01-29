import React from 'react'

export function ListGroup({ children }: { children: React.ReactNode }) {
  return <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow p-0">{children}</div>
}

export function ListGroupItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-4 py-3 border-b last:border-b-0 ${className}`}>{children}</div>
}
