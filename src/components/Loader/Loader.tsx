import React from 'react'

type Props = {
  color?: 'bg-gray-500' | 'bg-white'
}

export const Loader: React.FC<Props> = ({ color = 'bg-gray-500' }) => {
  return (
    <div data-testid="loader" className="inline-flex justify-center items-center animate-pulse">
      <div className={`h-3 w-3 rounded-full ${color}`}></div>
      <div className={`h-3 w-3 rounded-full ml-2 ${color}`}></div>
      <div className={`h-3 w-3 rounded-full ml-2 ${color}`}></div>
      <div className='relative w-0 opacity-0'>Loading</div>
    </div>
  )
}

Loader.displayName = 'Loader'
