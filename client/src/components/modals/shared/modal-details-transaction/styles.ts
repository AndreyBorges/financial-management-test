import { TransactionType } from '@/interfaces'
import { pxToRem } from '@/utils'
import { css, keyframes, styled } from 'styled-components'

const fadeIn = keyframes`
  0%{
    transform: translateY(50px);
    opacity: 0;
  }
  100%{
    transform: translateY(0px);
    opacity: 1;
  }
`

const fadeInModal = keyframes`
  0%{
    opacity: 0;
    transform: translate(-45%, -50%);
  }
  100%{
    opacity: 1;
    bottom: initial;
    transform: translate(-50%, -50%);
  }
`
export const ModalDetailsTransactionWrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    background: ${theme.gray50};
    border-top-right-radius: 32px;
    border-top-left-radius: 32px;
    z-index: 3;
    bottom: 0;
    padding: 4rem 3rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: ${fadeIn} 0.5s ease-in-out forwards;

    h1 {
      color: ${theme.green800};
      font-size: 1.25rem;
    }

    @media (min-width: 650px) {
      left: 50%;
      top: 50%;
      padding: 2.5rem 3rem;

      width: 500px;
      bottom: initial;
      border-radius: 6px;
      animation: ${fadeInModal} 0.5s ease-in-out forwards;
      h1 {
        color: ${theme.green800};
        font-size: 1.5rem;
      }
    }
  `}
`

export const ModalHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      svg {
        color: ${theme.green800};
        cursor: pointer;
      }
    }
  `}
`

export const ModalBody = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    gap: 1.25rem;
    margin-block: 1rem;
    color: ${theme.green800};

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > span {
        font-size: ${pxToRem(16)};
        letter-spacing: 0.1rem;
        &:first-of-type {
          font-weight: 600;
          text-align: left;
        }
        &:last-of-type {
          text-align: right;
        }
      }
    }
    @media (min-width: 650px) {
      gap: 1rem;
    }
  `}
`

export const ModalFooter = styled.footer`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    p {
      color: ${theme.green800};
      font-weight: 600;
    }
    > div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      cursor: pointer;
      span {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: ${theme.green800};

        svg {
          color: ${theme.green800};
        }
      }
    }
  `}
`

interface IModalTypeTransactionProps {
  type: TransactionType
}

export const ModalTypeTransaction = styled.div<IModalTypeTransactionProps>`
  ${({ theme, type }) => css`
    span {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      svg {
        color: ${type === 'income' ? theme.green450 : theme.red400};
      }
    }
  `}
`
export const ModalDatesTransaction = styled.div`
  > div {
    display: flex;
    gap: 0.25rem;
  }

  @media (min-width: 425px) {
    > div {
      gap: 0.5rem;
    }
  }
`
