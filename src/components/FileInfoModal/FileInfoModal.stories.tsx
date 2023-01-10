import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { FileInfoModal } from './FileInfoModal'
import { FileData } from '@/types'

const DATA: FileData = {
  id: '1',
  name: 'email.txt',
  format: 'plain/text',
  size: 123,
  data: [
    `slagarde@example.fr`,
    `ucamacho@example.net`,
    `gregoriochacon@example.net`,
  ],
}

const NO_DATA: FileData = {
  id: '1',
  name: 'email.txt',
  format: 'plain/text',
  size: 123,
  data: null,
}

storiesOf('FileInfoModal', module)
  .add('default', () => (
    <FileInfoModal
      data={DATA}
      onClose={action('onClose')}
      onRemove={action('onRemove')}
    />
  ))
  .add('No data', () => (
    <FileInfoModal
      data={NO_DATA}
      onClose={action('onClose')}
      onRemove={action('onRemove')}
    />
  ))
