import { Alert } from '@/components/Alert'
import { FileInput } from '@/components/FileInput'
import { FileList } from '@/components/FileList'
import { Form, FormikSubmit } from '@/components/Form'
import { FormError } from '@/components/FormError'
import { SuccessModal } from '@/components/SuccessModal'
import { useSendEmail } from '@/hooks/useSendEmail'
import { FileData } from '@/types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { array, object } from 'yup'

const MAX_AMOUNT = 100
const SCHEMA = object().shape({
  files: array()
    .max(25, 'Maximum of 25 files allowed')
    .test(
      'valid files',
      'Invalid file uploaded. Please remove the file before continuing.',
      ((data: FileData[]) => {
        return !data.some((item) => !item.data || item.data.length === 0)
      }) as any,
    )
    .test('email amount', `Maximum of ${MAX_AMOUNT} email adresses allowed`, ((
      data: FileData[],
    ) => {
      return (
        data.reduce((res, item) => res + (item.data || []).length, 0) <=
        MAX_AMOUNT
      )
    }) as any),
})

const INITIAL_VALUES = {
  files: [] as FileData[],
}

type Values = typeof INITIAL_VALUES

const Home: NextPage = () => {
  const { reload } = useRouter()
  const { sendEmail, error, data } = useSendEmail()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (data) {
      setSuccess(true)
    }
  }, [data])

  const onClose = useCallback(() => {
    setSuccess(false)
    reload()
  }, [setSuccess, reload])

  const onSubmit = useCallback<FormikSubmit<Values>>(async ({ files }) => {
    const emails = files.reduce(
      (res, { data }) => [...res, ...(data || [])],
      [] as string[],
    )
    await sendEmail(emails)
    return
  }, [])

  return (
    <div className="mx-auto max-w-4xl py-5 px-4 sm:px-6 lg:px-8">
      <h1 className="my-4 w-full text-center text-2xl text-gray-900">
        Email sender
      </h1>
      <Form<Values>
        submitText="Send"
        initialValues={INITIAL_VALUES}
        validationSchema={SCHEMA}
        onSubmit={onSubmit}
      >
        <FileInput name="files" />
        <div className="my-6" />
        <FileList name="files" />
        <FormError name="files" />
        {error && (
          <Alert red title={error.error}>
            {error.emails && (
              <ul role="list" className="my-6 divide-y divide-gray-400">
                {error.emails.map((email) => (
                  <li key={email} className="flex py-2">
                    <p className="text-sm text-gray-900">{email}</p>
                  </li>
                ))}
              </ul>
            )}
          </Alert>
        )}
      </Form>
      <SuccessModal open={success} onClose={onClose} />
    </div>
  )
}
export default Home
