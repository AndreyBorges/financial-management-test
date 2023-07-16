import { css, styled } from 'styled-components'
import { pxToRem } from '../../utils'

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    background: ${theme.gray50};
    box-shadow: 0 0 30px 5px ${theme.green600};

    > div {
      max-width: 1220px;
      padding: 24px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
    }
  `}
`

export const LogoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    h1 {
      color: ${theme.green900};
      font-size: ${pxToRem(18)};
    }

    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
    }

    @media (min-width: 750px) {
      h1 {
        font-size: ${pxToRem(24)};
      }
    }
  `}
`
