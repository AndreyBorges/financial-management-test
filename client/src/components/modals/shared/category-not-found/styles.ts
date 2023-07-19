import { css, styled } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    svg {
      color: ${theme.green450};
    }
    p {
      color: ${theme.green800};
    }
  `}
`
