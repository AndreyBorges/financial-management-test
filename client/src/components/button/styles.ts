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
    gap: 1rem;
    font-size: ${pxToRem(14)};
    padding: 0.75rem 1rem;
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
            ? theme.green450
            : color === 'error'
            ? theme.error
            : color === 'warning'
            ? theme.warning
            : theme.gray50};
          transition: background 0.2s;
          box-shadow: 0 0 0 1px
            ${color === 'success'
              ? theme.green450
              : color === 'error'
              ? theme.error
              : color === 'warning'
              ? theme.warning
              : theme.gray50};

          &:hover {
            color: ${theme.gray50};
            background: ${color === 'success'
              ? theme.green450
              : color === 'error'
              ? theme.error
              : color === 'warning'
              ? theme.success
              : 'transparent'};
            box-shadow: 0 0 0 1px
              ${color === 'success'
                ? theme.green450
                : color === 'error'
                ? theme.error
                : color === 'warning'
                ? theme.warning
                : theme.textPrimary};
          }
        `
      default:
        return css`
          background: ${theme.green450};
          color: ${theme.gray50};
          svg {
            color: ${theme.gray50};
          }

          &:hover {
            background: ${theme.green500};
          }
        `
    }
  }}
`
