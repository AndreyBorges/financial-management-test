import { css, styled } from 'styled-components'
import { pxToRem } from '../../utils'

const buttonBase = styled.button`
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  font: 400 1rem 'Open Sans', sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.15rem;
  font-weight: bold;
  gap: 0.5rem;
  font-size: ${pxToRem(12)};
  @media (min-width: 650px) {
    font-size: ${pxToRem(14)};
    padding: 1rem 2.5rem;
  }
`

interface IBasicButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline'
  color?: 'success' | 'error' | 'warning'
}

export const ButtonWrapper = styled(buttonBase)<IBasicButtonProps>`
  ${({ variant, theme, color }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: ${theme.green400};
          color: ${theme.gray50};
          transition: background 0.2s;

          &:hover {
            background: ${theme.sucessDark};
          }
        `
      case 'secondary':
        return css`
          background: ${theme.warning};
          color: ${theme.gray50};
          transition: background 0.2s;

          &:hover {
            background: ${theme.warningDark};
          }
        `
      case 'tertiary':
        return css`
          background: ${theme.error};
          color: ${theme.gray50};
          transition: background 0.2s;

          &:hover {
            background: ${theme.errorDark};
          }
        `
      case 'outline':
        return css`
          background: transparent;
          color: ${color === 'success'
            ? theme.success
            : color === 'error'
            ? theme.error
            : color === 'warning'
            ? theme.warning
            : theme.gray50};
          transition: background 0.2s;
          border: 1px solid
            ${color === 'success'
              ? theme.success
              : color === 'error'
              ? theme.error
              : color === 'warning'
              ? theme.warning
              : theme.gray50};

          &:hover {
            color: ${theme.textPrimary};
            background: ${color === 'success'
              ? theme.success
              : color === 'error'
              ? theme.error
              : color === 'warning'
              ? theme.success
              : 'transparent'};
            border: 1px solid
              ${color === 'success'
                ? theme.success
                : color === 'error'
                ? theme.error
                : color === 'warning'
                ? theme.warning
                : theme.textPrimary};
          }
        `
      default:
        return css`
          background: ${theme.green800};
          color: ${theme.gray50};
          transition: background 0.2s;

          &:hover {
            background: ${theme.green900};
          }
        `
    }
  }}
`
