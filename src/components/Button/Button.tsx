import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  )
}
