import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { FormError } from './FormError'
import { FormikWrap } from 'storyUtils'

storiesOf('FormError', module).add('default', () => (
  <FormikWrap>
    <FormError name="test" />
  </FormikWrap>
))
