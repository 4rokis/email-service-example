import React, { useEffect, useRef, useState } from 'react'
import { Modal } from '@/components/Modal'
import { FileData } from '@/types'
import { Alert } from '../Alert'

type Props = {
  data: FileData | null
  onClose: () => void
  onRemove: (id: string) => void
}

export const FileInfoModal: React.FC<Props> = ({ data: newData, onClose, onRemove }) => {
  const cancelButtonRef = useRef(null)
  const [data, setData] = useState(newData)

  useEffect(() => {
    if (newData) {
      setData(newData)
    } else {
      setTimeout(() => {
        setData(null)
      }, 300)
    }
  }, [newData])

  return (
    <Modal open={Boolean(newData)} title={"Emails"} initialFocus={cancelButtonRef} onClose={onClose}>
      {!data?.data && (
        <Alert title="File load failed">Could not load file</Alert>
      )}
      {data?.data && (
        <ul role="list" className="my-6 divide-y divide-gray-200">
          {data.data.map((email) => (
            <li key={email} className="flex py-4">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => onRemove(data!.id)}
        >
          Remove
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={onClose}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}
Modal.displayName = 'Modal'
