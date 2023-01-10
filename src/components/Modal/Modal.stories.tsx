import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Modal } from './Modal'

storiesOf('Modal', module).add('default', () => (
  <Modal open onClose={action('onClose')}>
    I am a modal!
  </Modal>
))
