import React, { FC } from 'react'
import { ButtonWrapper } from './styles'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline'
  color?: 'success' | 'error' | 'warning'
}

const Button: FC<IButtonProps> = ({ children, variant, color, ...rest }) => {
  return (
    <ButtonWrapper variant={variant} color={color} {...rest}>
      {children}
    </ButtonWrapper>
  )
}

export default Button
