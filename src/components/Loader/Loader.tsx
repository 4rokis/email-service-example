import React from 'react'

type Props = {
  centered?: boolean
}

export const Loader: React.FC<Props> = () => {
  return (
    <div data-testid="loader" className="flex animate-pulse space-x-2">
      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
    </div>
  )
}

Loader.displayName = 'Loader'
