import { css, styled } from 'styled-components'
import { TransactionType } from '@/interfaces'
import { pxToRem } from '@/utils'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1220px;
  margin: 4rem auto 0;
  padding: 0;
  border-radius: 6px;

  @media (max-width: 750px) {
    margin: 2rem auto 0;
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
    tr {
    }

    td {
      padding: 0 0.5rem;
      background: ${theme.gray50};
      height: 82px;

      p {
        color: ${theme.green600};
        display: flex;
        align-items: center;
        span {
          margin: 0 auto;
        }
        /* justify-content: space-between; */
      }

      &:last-of-type {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-inline: 0 2rem;
        div {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
      }

      svg {
        cursor: pointer;
        color: #37aa5c;
      }
    }

    @media (min-width: 425px) {
      td {
        &:first-of-type {
          padding: 0 2rem;
        }
        &:last-of-type {
          align-self: flex-end;
          justify-self: flex-end;
        }
        padding: 0 1rem;
      }
    }

    @media (min-width: 840px) {
      margin: ${pxToRem(64)} auto 0;

      td {
        padding: 0 2rem;

        &:last-of-type {
          div {
            display: flex;
          }
        }
      }
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
