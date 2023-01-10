import { useField } from 'formik'
import { Alert } from '@/components/Alert'

type Props = {
  name: string
}

export const FormError: React.FC<Props> = ({ name }) => {
  const [,{ error, touched }] = useField(name)
  if (!touched || !error) {
    return null
  }
  return <Alert>{error}</Alert>
}
FormError.displayName = 'FormError'
