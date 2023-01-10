import React from 'react'
import { fireEvent } from '@testing-library/dom'
import { waitFor } from '@testing-library/react'

import { render } from '../../testUtils'
import { Form } from './Form'
import { FormikInput } from './Input/FormikInput'
import { INPUT_ID } from './Input/Input.spec'
import { ID as SUBMIT_ID } from './Submit/Submit.spec'

const ID = 'form'

describe('Submit', () => {
  it('default', () => {
    const title = 'Title'
    const { getByText, getByTestId } = render(
      <Form initialValues={{}} onSubmit={() => {}}>
        {title}
      </Form>,
    )

    expect(getByText(title)).toBeTruthy()
    expect(getByTestId(SUBMIT_ID)).toBeTruthy()
  })

  it('customSubmit', () => {
    const title = 'Title'
    const { queryByTestId } = render(
      <Form customSubmit initialValues={{}} onSubmit={() => {}}>
        {title}
      </Form>,
    )

    expect(queryByTestId(SUBMIT_ID)).toBeFalsy()
  })

  it('hideOnNonDirty', () => {
    const { getByTestId } = render(
      <Form initialValues={{ name: '' }} onSubmit={() => {}}>
        <FormikInput label={'label'} name="name" />
      </Form>,
    )

    expect(getByTestId(SUBMIT_ID)).toHaveStyle('left: -9999px')
    fireEvent.change(getByTestId(INPUT_ID), { target: { value: 'test' } })
    expect(getByTestId(SUBMIT_ID)).toHaveStyle('left: 0')
  })

  it('hideOnNonDirty false', () => {
    const { getByTestId } = render(
      <Form
        hideOnNonDirty={false}
        initialValues={{ name: '' }}
        onSubmit={() => {}}
      >
        <FormikInput label={'label'} name="name" />
      </Form>,
    )

    expect(getByTestId(SUBMIT_ID)).toHaveStyle('left: 0')
  })

  it('trimArrays true', async () => {
    const spy = jest.fn()
    const { getByTestId } = render(
      <Form
        initialValues={{ name: ['a', ' ', 'b'] }}
        onSubmit={(val) => spy(val)}
      />,
    )
    fireEvent.submit(getByTestId(ID))

    await waitFor(() => expect(spy).toBeCalledWith({ name: ['a', 'b'] }))
  })

  it('trimArrays false', async () => {
    const spy = jest.fn()
    const { getByTestId } = render(
      <Form
        trimArrays={false}
        initialValues={{ name: ['a', ' ', 'b'] }}
        onSubmit={(val) => spy(val)}
      />,
    )
    fireEvent.submit(getByTestId(ID))

    await waitFor(() => expect(spy).toBeCalledWith({ name: ['a', ' ', 'b'] }))
  })

  it('resetOnSubmit', async () => {
    const value = 'value'
    const { getByTestId } = render(
      <Form resetOnSubmit initialValues={{ name: '' }} onSubmit={() => {}}>
        <FormikInput label={'label'} name="name" />
      </Form>,
    )
    fireEvent.change(getByTestId(INPUT_ID), { target: { value } })
    expect(getByTestId(SUBMIT_ID)).toHaveStyle('left: 0')
    fireEvent.submit(getByTestId(ID))
    await waitFor(() =>
      expect(getByTestId(SUBMIT_ID)).toHaveStyle('left: -9999px'),
    )
  })

  it('resetOnSubmit false', async () => {
    const value = 'value'
    const { getByTestId } = render(
      <Form initialValues={{ name: '' }} onSubmit={() => {}}>
        <FormikInput label={'label'} name="name" />
      </Form>,
    )
    fireEvent.change(getByTestId(INPUT_ID), { target: { value } })
    expect(getByTestId(SUBMIT_ID)).toHaveStyle('left: 0')
    fireEvent.submit(getByTestId(ID))
    await waitFor(() => expect(getByTestId(SUBMIT_ID)).toHaveStyle('left: 0'))
  })

  it('initial values', async () => {
    const value = 'test'
    const { getByTestId } = render(
      <Form initialValues={{ name: value }} onSubmit={() => {}}>
        <FormikInput label={'label'} name="name" />
      </Form>,
    )
    expect(getByTestId(INPUT_ID)).toHaveAttribute('value', value)
  })

  it('onSubmit', async () => {
    const spy = jest.fn()
    const value = 'value'
    const { getByTestId } = render(
      <Form initialValues={{ name: '' }} onSubmit={(val) => spy(val)}>
        <FormikInput label={'label'} name="name" />
      </Form>,
    )
    fireEvent.change(getByTestId(INPUT_ID), { target: { value } })

    fireEvent.submit(getByTestId(INPUT_ID))
    await waitFor(() => expect(spy).toBeCalledTimes(1))
    await waitFor(() => expect(spy).toBeCalledWith({ name: value }))
  })

  it('className', () => {
    const className = 'className'
    const { getByTestId } = render(
      <Form
        initialValues={{ name: '' }}
        onSubmit={() => {}}
        className={className}
      />,
    )
    expect(getByTestId(ID)).toHaveClass(className)
  })
})
