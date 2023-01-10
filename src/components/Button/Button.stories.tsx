import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from '@/components/Button'

storiesOf('Button', module).add('default', () => (
  <Button onClick={action('onClick')}>Button</Button>
))
