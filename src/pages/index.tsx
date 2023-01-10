import { FileInput } from '@/components/FileInput'
import { FileList } from '@/components/FileList'
import { Loader } from '@/components/Loader'
import { FileData } from '@/types'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'

const Home: NextPage = () => {
  const [files, setFiles] = useState<FileData[]>([])
  const updateFiles = useCallback((data: FileData[]) => {
    setFiles(prev => [...prev, ...data])
  }, [setFiles])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(({ id: fileId }) => fileId !== id))
  }, [setFiles])
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <h1 className='text-center w-full text-2xl text-gray-900 my-4' >Email sender</h1>
      <FileInput inputId='file-input' onUpload={updateFiles} />
      <div className='my-6' />
      <FileList data={files} onRemove={removeFile} />
      <div className='w-full flex justify-end mt-8'>
      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <EnvelopeIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        Send
      </button>

      </div>
    </div>
  )
}
export default Home
