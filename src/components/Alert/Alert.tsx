import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

type Props = {
  title?: string
  children: ReactNode
}

export const Alert: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="my-6 pointer-events-auto w-full overflow-hidden rounded-lg bg-yellow-50 ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            {title && <p className="text-sm mb-1 font-medium text-gray-900">{title}</p>}
            <p className={`text-sm ${title? 'text-gray-500' : 'text-gray-900'}`}>{children}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
Alert.displayName = 'Alert'
