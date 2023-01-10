import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Alert } from './FormError'

storiesOf('Alert', module).add('default', () => (
  <Alert title="Alert title">I am an alert!</Alert>
))
