import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { FileInput } from './FileInput'

storiesOf('FileInput', module).add('default', () => <FileInput inputId='input' onUpload={action('onUpload')} />)
