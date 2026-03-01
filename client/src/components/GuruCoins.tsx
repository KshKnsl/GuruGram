import { Cog } from 'lucide-react'

interface GuruCoinsProps {
  coins: number
  size?: 'sm' | 'md' | 'lg'
}

export default function GuruCoins({ coins, size = 'md' }: GuruCoinsProps) {
  const containerSizes = {
    sm: 'px-2.5 py-1 gap-1.5 text-xs',
    md: 'px-3.5 py-1.5 gap-2 text-sm',
    lg: 'px-4 py-2 gap-2.5 text-base',
  }

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div className={`inline-flex items-center border border-amber-500/30 bg-amber-500/8 ${containerSizes[size]}`}>
      <Cog className={`${iconSizes[size]} text-amber-500 shrink-0`} />
      <span className="font-medium tracking-widest uppercase text-amber-600 dark:text-amber-400">
        {coins.toLocaleString()}
        <span className="ml-1 text-amber-500/70">GuruCoins</span>
      </span>
    </div>
  )
}