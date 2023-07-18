import { css, styled } from 'styled-components'
import { pxToRem } from '../../utils'

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    position: fixed;
    width: 100vw;
    top: 0;

    z-index: 9999;

    > div {
      background: ${theme.gray50};
    }
  `}
`

export const LogoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 0.5rem;
    max-width: 1220px;
    padding: 24px 40px;
    margin: 0 auto;

    @media (max-width: 750px) {
      padding: 24px 46px;
    }

    @media (min-width: 750px) and (max-width: 1024px) {
      padding: 24px 48px;
    }
    > div:first-child {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      h1 {
        color: ${theme.green900};
        font-size: ${pxToRem(18)};
      }
    }

    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
    }

    @media (min-width: 750px) {
      > div:first-child {
        gap: 1rem;
        h1 {
          font-size: ${pxToRem(24)};
        }
      }
    }
  `}
`
