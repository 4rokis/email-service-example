import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { FileList } from './FileList'
import { FileData } from '@/types'

const DATA: FileData[] = [
  {
    id: '1',
    name: 'email.txt',
    format: 'plain/text',
    size: 123,
    data: `slagarde@example.fr
ucamacho@example.net
gregoriochacon@example.net`,
  },
  {
    id: '1',
    name: 'email.txt',
    format: 'plain/text',
    size: 123,
    data: `slagarde@example.fr
ucamacho@example.net
gregoriochacon@example.net`,
  },
  {
    id: '1',
    name: 'email.txt',
    format: 'plain/text',
    size: 123,
    data: `slagarde@example.fr
ucamacho@example.net
gregoriochacon@example.net`,
  },
  {
    id: '1',
    name: 'email.txt',
    format: 'plain/text',
    size: 123,
    data: `slagarde@example.fr
ucamacho@example.net
gregoriochacon@example.net`,
  },
]

storiesOf('FileList', module).add('default', () => <FileList data={DATA} onRemove={action('onRemove')} />)
