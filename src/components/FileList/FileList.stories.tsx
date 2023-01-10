import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { FileList } from './FileList'
import { FileData } from '@/types'

const DATA: FileData[] = [
  {
    id: '1',
    name: 'email-1.txt',
    format: 'plain/text',
    size: 123,
    data: [
      `slagarde@example.fr`,
      `ucamacho@example.net`,
      `gregoriochacon@example.net`,
    ],
  },
  {
    id: '2',
    name: 'email-2.txt',
    format: 'plain/text',
    size: 123,
    data: [
      `slagarde@example.fr`,
      `ucamacho@example.net`,
      `gregoriochacon@example.net`,
    ],
  },
  {
    id: '3',
    name: 'email-3.txt',
    format: 'plain/text',
    size: 123,
    data: [
      `slagarde@example.fr`,
      `ucamacho@example.net`,
      `gregoriochacon@example.net`,
    ],
  },
  {
    id: '4',
    name: 'email-4.txt',
    format: 'plain/text',
    size: 123,
    data: null,
  },
]

storiesOf('FileList', module).add('default', () => (
  <FileList data={DATA} onRemove={action('onRemove')} />
))
