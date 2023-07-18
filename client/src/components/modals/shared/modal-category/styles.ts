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
    transform: translate(-45%, -50%);
  }
  100%{
    opacity: 1;
    bottom: initial;
    transform: translate(-50%, -50%);
  }
`
export const ModalCategoryWrapper = styled.div`
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

export const TransactionsType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

export const ModalHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    justify-content: space-between;

    svg {
      color: ${theme.green800};
      cursor: pointer;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      cursor: pointer;

      span {
        color: ${theme.green800};
        text-transform: uppercase;
        letter-spacing: 0.1rem;
      }
    }
  `}
`

export const ModalBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > button {
    justify-self: flex-end;
    font-size: 1rem;

    svg {
      animation: ${rotateSpinner} 1s linear infinite;
    }
  }
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
        background: ${theme.gray50};
        box-shadow: 0 0 0 1px ${theme.green450};
        color: ${theme.green800};
        padding: 1.25rem 1rem;
        font-size: ${pxToRem(16)};

        &::placeholder {
          color: ${theme.green800};
          opacity: 0.9;
        }
      }
    }
    span {
      display: block;
      height: ${pxToRem(22)};
      margin: 0.25rem 0 0.25rem 0.5rem;
      color: ${theme.green800};
    }
  `}
`
