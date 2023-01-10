import React, { useRef } from 'react'
import { Modal } from '@/components/Modal'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'

type Props = {
  open: boolean
  onClose: () => void
}

export const SuccessModal: React.FC<Props> = ({ onClose, open }) => {
  const cancelButtonRef = useRef(null)

  return (
    <Modal open={open} initialFocus={cancelButtonRef} onClose={onClose}>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Success
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Emails have been succesfully sent
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          ref={cancelButtonRef}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
          onClick={onClose}
        >
          Go back to dashboard
        </button>
      </div>
    </Modal>
  )
}
SuccessModal.displayName = 'SuccessModal'
