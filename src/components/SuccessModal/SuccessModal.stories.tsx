import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { SuccessModal } from './SuccessModal'

storiesOf('SuccessModal', module).add('default', () => (
  <SuccessModal open onClose={action('onClose')} />
))
