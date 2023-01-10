import { FileData } from '@/types'
import { useState } from 'react'
import { FileInfoModal } from '../FileInfoModal'

type Props = {
  onRemove: (id: string) => void
  data: FileData[]
}

export const FileList: React.FC<Props> = ({ data, onRemove }) => {
  const [more, setMore] = useState<FileData | null>(null)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">File</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all uploaded email files
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 text-center  sm:table-cell"
                    >
                      Format
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 text-center sm:table-cell"
                    >
                      Amount
                    </th>
                    <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.name}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center sm:table-cell">
                        {item.format}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center sm:table-cell">
                        {item.data ? item.data.split('\n').length : 0}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          type="button"
                          aria-label={`More info about ${item.name} file`}
                          onClick={() => setMore(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          More info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <FileInfoModal data={more} onClose={() => setMore(null)} onRemove={(id) => {
                onRemove(id)
                setMore(null)
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
FileList.displayName = 'FileList'
