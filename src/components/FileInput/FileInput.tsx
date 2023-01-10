import { FileData } from '@/types'
import { useField } from 'formik'
import React, { useCallback } from 'react'
import { Loader } from '../Loader'

import {
  ACCEPT_TYPE,
  getDropData,
  getUploadData,
  preventAll,
} from './FileInputUtils'

type Props = {
  name: string
}

export const FileInput: React.FC<Props> = ({ name }) => {
  const [{ value = [] }, , { setValue, setTouched }] =
    useField<FileData[]>(name)
  const [drag, setDrag] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const updateValue = useCallback(
    (data: FileData[]) => {
      setValue([...value, ...data])
      setTouched(true)
    },
    [value, setValue],
  )

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

      updateValue(await getDropData(ev))

      setLoading(false)
    },
    [updateValue, setDrag, setLoading, loading, getDropData],
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
        setLoading(false)
        return
      }

      updateValue(data)
      setLoading(false)
    },
    [updateValue, setDrag, setLoading, loading, getUploadData],
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
        id={name}
        disabled={loading}
        className="absolute inset-0 cursor-pointer opacity-0"
        accept={ACCEPT_TYPE.join(',')}
        type="file"
        multiple
        onChange={onFileUpload}
      />
      <div className={`text-center text-sm font-semibold text-gray-800`}>
        <label htmlFor={name}>Select files</label>
        <div>{drag ? 'Drop here' : 'or drag photos here'}</div>
      </div>
    </div>
  )
}
FileInput.displayName = 'FileInput'
