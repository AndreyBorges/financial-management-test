import { css, keyframes, styled } from 'styled-components'
import { pxToRem } from '@/utils'

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

    span {
      color: ${theme.green800};
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

export const ModalBody = styled.div`
  ${({ theme }) => css`
    width: calc(100% + 28px);
    max-height: ${pxToRem(500)};
    overflow: auto;
    display: flex;
    text-align: center;
    flex-direction: column;
    gap: 1rem;
    margin-block: 1rem;
    color: ${theme.green800};

    ul {
      display: flex;
      flex-direction: column;
      padding-right: 12px;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 1px solid ${theme.gray200};
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        &:last-child {
          border-bottom: none;
        }

        width: 100%;
        > div {
          display: flex;
          align-items: center;
          gap: 1.5rem;

          svg {
            cursor: pointer;
          }
        }
        span {
          font-size: ${pxToRem(20)};
          letter-spacing: 0.1rem;
        }
      }
    }
  `}
`

export const ModalFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`
