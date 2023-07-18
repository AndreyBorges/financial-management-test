import { css, styled } from 'styled-components'
import { TransactionType } from '@/interfaces'
import { pxToRem } from '@/utils'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1220px;
  margin: 2rem auto 0;
  padding: 0;
  border-radius: 6px;

  @media (max-width: 750px) {
    margin: 1rem auto 0;
  }
`

export const TransactionsTableWrapper = styled.table`
  ${({ theme }) => css`
    width: calc(100% - 32px);
    border-collapse: separate;
    border-spacing: 0 0.1rem;
    margin: ${pxToRem(32)} auto 0;
    box-shadow: 0 0 50px -10px ${theme.gray400};
    overflow: hidden;
    border-radius: 12px;

    td {
      padding: 0 0.75rem;
      background: ${theme.gray50};
      height: 82px;

      p {
        color: ${theme.green600};
        display: flex;
        align-items: center;
        span {
          margin: 0 auto;
        }
      }
      &:first-of-type {
        padding-inline: 2rem 0;
      }

      &:last-of-type {
        align-items: center;
        justify-content: flex-end;
        div {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        width: 68px;
      }

      @media (min-width: 750px) {
        &:last-of-type {
          padding-right: 26px;
          width: auto;
        }
      }

      svg {
        cursor: pointer;
        color: ${theme.green450};
      }
      > div {
        :hover {
          &:first-of-type {
            svg {
              color: ${theme.warning};
            }
          }
          &:last-of-type {
            svg {
              color: ${theme.error};
            }
          }
        }
      }
    }
  `}
`

export const CategoryTag = styled.td`
  ${({ theme }) => css`
    margin: 0 auto;
    min-width: 200px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    p {
      padding-inline: 0.5rem;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid ${theme.green450};
      height: 24px;
      background: ${theme.green450};
      color: ${theme.gray50} !important;
      letter-spacing: 0.1rem;
    }
  `}
`
interface PriceHighlightProps {
  variant: TransactionType
}

export const PriceHighlight = styled.td<PriceHighlightProps>`
  ${({ theme, variant }) => css`
    color: ${variant === 'income' ? theme.success : theme.errorLight};
    font-weight: 600;
    max-width: 80px;
    height: 100%;

    > div {
      display: flex;
      gap: 1ch;
      align-items: center;
      justify-content: space-between;
      span:last-of-type {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    @media (min-width: 750px) {
      max-width: 200px;
    }
  `}
`

export const TransactionSearch = styled.div`
  ${({ theme }) => css`
    width: calc(100% - ${pxToRem(32)});
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      width: 100%;
      border-radius: ${pxToRem(6)};
      border: 0;
      background: ${theme.grey50};
      color: ${theme.green800};
      padding: 1.25rem ${pxToRem(32)}};
      font-size: ${pxToRem(16)};

      &::placeholder {
        color: ${theme.green800};
        opacity: 0.6;
      }
    }
  `}
`

export const Navigation = styled.footer`
  ${({ theme }) => css`
    padding-inline: 1rem;
    width: 100%;
    display: flex;
    margin-block: 4rem 2rem;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;

    > div {
      display: flex;
      gap: 1rem;
      height: 100%;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      box-shadow: 0 0 0 2px ${theme.gray50};
      color: ${theme.gray50};
      border-radius: 6px;
      text-transform: uppercase;
      font-weight: 600;
      font-size: ${pxToRem(16)};
      width: 42px;
      height: 42px;
      svg {
        color: ${theme.gray50};
      }
      &:hover {
        background: ${theme.gray50};
        color: ${theme.green450};

        svg {
          color: ${theme.green450};
        }
      }

      &.active {
        background: ${theme.gray50};
        color: ${theme.green450};
      }

      &:disabled {
        background: ${theme.gray50};
        color: ${theme.green600};
        box-shadow: none;
        opacity: 0.4;

        svg {
          color: ${theme.green600};

          &:hover {
            color: ${theme.green600};
          }
        }
      }
    }

    @media (max-width: 750px) {
      margin-block: 2rem 1rem;
      justify-content: space-between;

      > div {
        gap: 0.5rem;
        button {
          padding: 0.75rem 1.25rem;
        }
      }
    }
  `}
`

export const NewTransactionButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 0 2rem;

    button {
      background: transparent;
      &:hover {
        background: transparent;
      }
    }
  `}
`
