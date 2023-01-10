import { FileData } from '@/types'
import React from 'react'
import { Loader } from '../Loader'

import {
  ACCEPT_TYPE,
  getDropData,
  getUploadData,
  preventAll,
} from './FileInputUtils'

type Props = {
  inputId: string
  onUpload(data: FileData[]): void
}

export const FileInput: React.FC<Props> = ({ inputId, onUpload }) => {
  const [drag, setDrag] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onDragEnter = React.useCallback(
    (ev: React.DragEvent<HTMLInputElement>) => {
      preventAll(ev)
      setDrag(true)
    },
    [setDrag],
  )

  const onDragLeave = React.useCallback(
    (ev: React.DragEvent<HTMLInputElement>) => {
      preventAll(ev)
      setDrag(false)
    },
    [setDrag],
  )

  const onDrop = React.useCallback(
    async (ev: React.DragEvent<HTMLInputElement>) => {
      preventAll(ev)
      if (loading) {
        return
      }
      setDrag(false)
      setLoading(true)

      onUpload(await getDropData(ev))

      setLoading(false)
    },
    [onUpload, setDrag, setLoading, loading, getDropData],
  )

  const onFileUpload = React.useCallback(
    async (ev: React.ChangeEvent<HTMLInputElement>) => {
      preventAll(ev)
      if (loading) {
        return
      }
      setLoading(true)
      setDrag(false)

      const data = await getUploadData(ev, false)

      if (data.length === 0) {
        ev.target.value = null as any
        return
      }

      onUpload(data)
      setLoading(false)
    },
    [onUpload, setDrag, setLoading, loading, getUploadData],
  )

  return (
    <div
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      onDragOver={preventAll}
      onDragLeave={onDragLeave}
      className="relative flex h-36 w-full flex-col items-center justify-center rounded-md bg-gray-50 shadow ring-1 ring-gray-300 focus-within:border-indigo-500 focus-within:ring-indigo-500 sm:text-sm"
    >
      <input
        id={inputId}
        disabled={loading}
        className="absolute inset-0 cursor-pointer opacity-0"
        accept={ACCEPT_TYPE.join(',')}
        type="file"
        multiple
        onChange={onFileUpload}
      />
      {loading && <Loader />}
      <div className={`text-center text-sm font-semibold text-gray-800 ${loading ? 'opacity-0' : ''}`}>
        <label htmlFor={inputId}>Select files</label>
        <div>{drag ? 'Drop here' : 'or drag photos here'}</div>
      </div>
    </div>
  )
}
FileInput.displayName = 'FileInput'
