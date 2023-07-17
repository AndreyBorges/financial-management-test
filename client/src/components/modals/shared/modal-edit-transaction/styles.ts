import { css, keyframes, styled } from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { pxToRem } from '@/utils'

const rotateSpinner = keyframes`
  0.00%, 12.49% { transform: rotate(0deg)   }
  12.5%, 24.99% { transform: rotate(45deg)  }
  25.0%, 37.49% { transform: rotate(90deg)  }
  37.5%, 49.99% { transform: rotate(135deg) }
  50.0%, 62.49% { transform: rotate(180deg) }
  62.5%, 74.99% { transform: rotate(225deg) }
  75.0%, 87.49% { transform: rotate(270deg) }
  87.5%, 99.99% { transform: rotate(315deg) }
  100% { transform: rotate(360deg)}     
`

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
    transform: translate(-50%, -45%);
  }
  100%{
    opacity: 1;
    bottom: initial;
    transform: translate(-50%, -50%);
  }
`

export const ModalTransactionWrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    background: ${theme.green700};
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
      color: ${theme.green100};
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
        color: ${theme.green100};
        font-size: 1.5rem;
      }
    }
  `}
`

export const TransactionsType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

interface TransactionsButtonTypeProps {
  variant: 'income' | 'outcome'
}

export const TransactionsButtonType = styled(RadioGroup.Item)<TransactionsButtonTypeProps>`
  ${({ theme, variant }) => css`
    background: ${theme.green700};
    filter: brightness(1.4);
    color: ${theme.textPrimary};
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    gap: 0.5rem;
    cursor: pointer;
    padding: 1rem;
    transition: all 0.2s;
    text-transform: uppercase;
    font-size: ${pxToRem(14)};
    letter-spacing: 0.15rem;
    font-weight: bold;

    svg {
      color: ${variant === 'income' ? theme.green400 : theme.error};
    }

    &[data-state='unchecked']:hover {
      filter: initial;
      &:nth-of-type(1) {
        background: ${theme.green200};
      }
      &:nth-of-type(2) {
        background: ${theme.errorLight};
      }
    }

    &[data-state='unchecked'] {
      color: ${theme.gray50};
    }

    &[data-state='checked'] {
      color: ${theme.gray50};
      background: ${variant === 'income' ? theme.green400 : theme.red400};
      svg {
        color: ${theme.gray50};
      }
    }
  `}
`
export const ModalHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    justify-content: space-between;

    svg {
      color: ${theme.green100};
      cursor: pointer;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      cursor: pointer;

      span {
        color: ${theme.green50};
        text-transform: uppercase;
        letter-spacing: 0.1rem;
      }
    }
  `}
`

export const ModalBody = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      color: ${theme.green100};
      font-size: 1.25rem;
    }

    > div {
    }

    > button {
      justify-self: flex-end;
      font-size: 1rem;

      svg {
        animation: ${rotateSpinner} 1s linear infinite;
        color: ${theme.green900};
      }
    }
  `}
`

export const ContainerInputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    > div {
      width: 100%;
      input {
        width: 100%;
        border-radius: ${pxToRem(6)};
        border: 0;
        background: ${theme.green900};
        color: ${theme.green50};
        padding: 1.25rem 1rem;
        font-size: ${pxToRem(16)};

        &::placeholder {
          color: ${theme.green50};
          opacity: 0.5;
        }
      }
    }
    span {
      display: block;
      height: ${pxToRem(22)};
      margin: 0.25rem 0 0.25rem 0.5rem;
      color: ${theme.green50};
    }
  `}
`
export const SelectBoxWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 42px;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    > svg {
      color: ${theme.green50};
      cursor: pointer;
      opacity: 0.8;

     
  `}
`
