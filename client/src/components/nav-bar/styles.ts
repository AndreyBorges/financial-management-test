import { styled, css } from 'styled-components'

export const Container = styled.nav`
  ${({ theme }) => css`
    background: ${theme.green900};

    ul {
      max-width: 1220px;
      margin-inline: auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 10px;

      li {
        min-width: 50%;
        color: ${theme.green50};
        letter-spacing: 0.1rem;
        text-align: center;
        padding: 0.5rem;

        &.active {
          background: ${theme.gray50};
          color: ${theme.green800};
          font-weight: bold;
        }
      }
    }

    @media (min-width: 750px) {
    }
  `}
`
