import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Form } from './Form'
import { FileInput } from '../FileInput'

storiesOf('Form', module).add('default', () => (
  <Form
    initialValues={{ name: '' }}
    onSubmit={() => {
      action('onSubmit')()
      return new Promise((res) => {
        setTimeout(() => {
          res(null)
        }, 2000)
      })
    }}
  >
    <FileInput name="files" />
  </Form>
))
