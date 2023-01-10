import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Alert } from './Alert'

storiesOf('Alert', module).add('default', () => (
  <Alert title="Alert title">I am an alert!</Alert>
))
.add('red', () => (
  <Alert red title="Alert title">I am an alert!</Alert>
))
