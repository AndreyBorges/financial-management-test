import { css, styled } from 'styled-components'
import { pxToRem } from '@/utils'

export const TransactionsNotFoundWrapper = styled.section`
  ${({ theme }) => css`
    width: calc(100% - 32px);
    max-width: 1220px;
    margin: 2rem auto;
    padding: ${pxToRem(60)};
    border-radius: 12px;
    background: ${theme.gray50};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    box-shadow: 0 0 50px -10px ${theme.gray400};
    height: 416px;

    svg {
      color: #37aa5c;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      p {
        color: ${theme.green800};

        font-size: ${pxToRem(24)};
        text-align: center;
        line-height: ${pxToRem(20)};
      }
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      box-shadow: 0 0 0 1px #37aa5c;
      color: #37aa5c;
      font-size: ${pxToRem(18)};
      border-radius: 6px;
      text-transform: uppercase;
      font-weight: 600;
      padding: 0.5rem 1rem;

      svg {
        color: #37aa5c;
      }

      &:hover {
        background: #37aa5c;
        color: ${theme.gray50};
        svg {
          color: ${theme.green800};
        }
      }
    }
    @media (max-width: 750px) {
      gap: 1rem;
      margin: 1rem auto;

      > div {
        gap: 0.5rem;
      }

      button {
        gap: 0.5rem;
        padding: 0.81rem;
        font-size: ${pxToRem(14)};
      }
    }
  `}
`
