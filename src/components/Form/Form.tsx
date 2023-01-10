import React from 'react'
import {
  FormikConfig,
  Formik,
  Form as FormikForm,
  FormikValues,
  FormikHelpers,
} from 'formik'
import { ObjectSchema } from 'yup'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Loader } from '../Loader'

export type FormikSubmit<T> = (
  values: T,
  value: FormikHelpers<T>,
) => Promise<void> | void

type Props<T = Record<string, any>> = FormikConfig<T> & {
  validationSchema?: ObjectSchema<any>
  submitText?: string
  'data-testid'?: string
  'submit-data-testid'?: string
  className?: string
}

export function Form<T extends FormikValues = FormikValues>({
  children,
  onSubmit,
  validationSchema,
  submitText = 'Save',
  className,
  'data-testid': dataTestID = 'form',
  'submit-data-testid': submitDataTestId,
  ...rest
}: Props<T>): JSX.Element {
  const [loading, setLoading] = React.useState(false)
  const onFormSubmit = React.useCallback<FormikSubmit<T>>(
    async (values, helpers) => {
      setLoading(true)
      try {
        await onSubmit(values, helpers)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    [onSubmit, setLoading],
  )
  return (
    <Formik<T>
      validateOnChange
      validateOnBlur={false}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
      {...rest}
    >
      {({ isValid, dirty }) => (
        <FormikForm data-testid={dataTestID} className={className}>
          <>
            {children}
            <div className="mt-8 flex w-full justify-end">
              {dirty && (
                <button
                  disabled={loading || !isValid}
                  type="submit"
                  className="inline-flex items-center justify-between rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500"
                >
                  {loading ? (
                    <Loader color="bg-white" />
                  ) : (
                    <>
                      <EnvelopeIcon
                        className="-ml-1 mr-2 h-5 w-5 flex-none text-center"
                        aria-hidden="true"
                      />
                      {submitText}
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        </FormikForm>
      )}
    </Formik>
  )
}
