import { FileData } from '@/types'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export const ACCEPT_TYPE = ['text/plain']
export const MAX_SIZE = 10485760

export const preventAll = (
  e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
) => {
  e.preventDefault()
  e.stopPropagation()
}

export const readFile = async (file: File): Promise<string> => {
  return await new Promise((res) => {
    const reader = new FileReader()
    reader.onloadend = function (ev) {
      res(ev.target?.result as string)
    }
    reader.readAsText(file)
  })
}

export const splitLines = (fileString: string): string[] => {
  return fileString
    .split('\n')
    .filter((line) => Boolean(line))
    .map((line) => line.trim())
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
    id: uuidv4(),
    data: shouldFetchData ? splitLines(await readFile(file)) : null,
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
