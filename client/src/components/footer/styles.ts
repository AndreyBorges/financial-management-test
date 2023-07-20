import { css, styled } from 'styled-components'

export const Container = styled.footer`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    height: 80px;
    letter-spacing: 0.2rem;
    color: ${theme.green800};
    text-transform: uppercase;
    font-family: monospace;
    font-size: 0.75rem;
    a {
      letter-spacing: 0.2rem;
      font-family: monospace;
      text-transform: uppercase;
      font-weight: 600;
      text-decoration: none;
      color: ${theme.green800};
    }
  `}
`
