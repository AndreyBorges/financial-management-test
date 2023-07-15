import { css, styled } from 'styled-components'

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    background: ${theme.gray50};
    box-shadow: 0 0 50px 5px ${theme.green600};

    > div {
      max-width: 1220px;
      padding: 24px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;

      h1 {
        font-weight: 400;
        color: ${theme.green900};
        font-size: 16px;
      }
    }

    @media (min-width: 650px) {
      > div {
        h1 {
          font-size: 24px;
        }
      }
    }
  `}
`
