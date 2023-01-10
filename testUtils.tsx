import React from 'react'
import { render } from '@testing-library/react'

export const customRender = (ui: React.ReactElement) => {
  const AllTheProviders: React.FC<any> = ({ children }) => {
    return <>{children}</>
  }
  return render(ui, { wrapper: AllTheProviders })
}

export * from '@testing-library/react'

export { customRender as render }
