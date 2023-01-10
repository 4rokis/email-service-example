import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { FileInput } from './FileInput'
import { FormikWrap } from 'storyUtils'

storiesOf('FileInput', module).add('default', () => (
  <FormikWrap>
    <FileInput name="name" />
  </FormikWrap>
))
