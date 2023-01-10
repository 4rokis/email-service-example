import { useCallback, useState } from 'react'

const ENDPOINT = 'https://toggl-hire-frontend-homework.onrender.com/api/send'

const ERROR_DICT: { [key: string]: string } = {
  send_failure: 'Failed to send email to following adresses',
  invalid_email_address: 'Following email adresses are not valid',
}

export const useSendEmail = () => {
  const [error, setError] = useState<{
    error: string
    emails: string[] | null
  } | null>(null)
  const [data, setData] = useState<boolean | null>(null)
  const sendEmail = useCallback(async (emails: string[]) => {
    setError(null)
    setData(null)
    try {
      const result = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails,
        }),
      })
      if (!result) {
        throw new Error('Fetch result not defined')
      }
      if (result.status < 400) {
        setData(true)
        return true
      }
      const data = await result.json()
      if (!data.error || !ERROR_DICT[data.error]) {
        throw new Error('Unexpected api error')
      }
      setError({ ...data, error: ERROR_DICT[data.error] })
      setData(false)
      return false
    } catch (e) {
      console.error(e)
      setError({ error: 'Unexpected error', emails: [] })
      setData(false)
    }
  }, [])

  return {
    error,
    data,
    sendEmail,
  }
}
