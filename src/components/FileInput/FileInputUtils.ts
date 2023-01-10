import React from 'react'

export const ACCEPT_TYPE = ['text/plain']
export const MAX_SIZE = 10485760
export type FileData = {
  name: string
  size: number
  format: string
  data: string | null
}

export const preventAll = (
  e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
) => {
  e.preventDefault()
  e.stopPropagation()
}

export const readFile = async (file: File): Promise<string> => {
  return await new Promise((res) => {
    const reader = new FileReader()
    reader.onloadend = function (ev) { res(ev.target?.result as string) };
    reader.readAsText(file); 
  })
}

export const handleFile = async (file: File | null): Promise<FileData> => {
  if (!file) {
    throw new Error('File should be defined')
  }

  let shouldFetchData = true
  if (!ACCEPT_TYPE.includes(file.type)) {
    shouldFetchData = false
  }

  if (file.size >= MAX_SIZE) {
    shouldFetchData = false
  }

  return {
    data: shouldFetchData ? await readFile(file) : null,
    name: file.name,
    format: file.type,
    size: file.size,
  }
}

export const getDropData = async (ev: React.DragEvent<HTMLInputElement>) => {
  const dataTransfer = ev.dataTransfer?.items
  if (!dataTransfer) {
    return []
  }
  const length = dataTransfer.length
  const ret = []
  const files = []
  for (let i = 0; i < length; i += 1) {
    files.push(dataTransfer[i].getAsFile())
  }

  for (let i = 0; i < files.length; i += 1) {
    ret.push(await handleFile(files[i]))
  }
  return ret
}

export const getUploadData = async (
  ev: React.ChangeEvent<HTMLInputElement>,
  single: boolean = false,
): Promise<FileData[]> => {
  const files = ev.target.files
  if (!files) {
    return []
  }
  const length = single ? 1 : files.length
  const ret: FileData[] = []
  for (let i = 0; i < length; i += 1) {
    const file = files[i]
    const fileData = await handleFile(file)
    if (fileData) {
      ret.push(fileData)
    }
  }
  return ret
}
