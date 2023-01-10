import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full" lang="en">
      <body className="flex h-full flex-col bg-gray-100">
        <Head />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
