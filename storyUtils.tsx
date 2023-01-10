import { Form, Formik } from 'formik'
import React from 'react'

export const FormikWrap: React.FC<{
  onSubmit?: any
  values?: any
  validate?: any
  children: any
}> = ({
  onSubmit = () => {},
  values = { name: '' },
  children,
  validate = () => {},
}) => {
  return (
    <Formik
      initialValues={{ ...values }}
      validate={validate}
      onSubmit={(values) => onSubmit(Object.entries(values))}
    >
      <Form data-testid="form">{children}</Form>
    </Formik>
  )
}
