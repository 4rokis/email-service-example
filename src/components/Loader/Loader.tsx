import React from 'react'

type Props = {
  color?: 'bg-gray-500' | 'bg-white'
}

export const Loader: React.FC<Props> = ({ color = 'bg-gray-500' }) => {
  return (
    <div
      data-testid="loader"
      className="inline-flex animate-pulse items-center justify-center"
    >
      <div className={`h-3 w-3 rounded-full ${color}`}></div>
      <div className={`ml-2 h-3 w-3 rounded-full ${color}`}></div>
      <div className={`ml-2 h-3 w-3 rounded-full ${color}`}></div>
      <div className="relative w-0 opacity-0">Loading</div>
    </div>
  )
}

Loader.displayName = 'Loader'
