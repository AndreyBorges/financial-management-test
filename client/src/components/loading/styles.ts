import { keyframes, styled, css } from 'styled-components'
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

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    width: calc(100% - 32px);
    max-width: 1220px;
    padding: ${pxToRem(60)};
    border-radius: 12px;
    background: ${theme.gray50};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    box-shadow: 0 0 50px -10px ${theme.gray400};
    height: 416px;
    margin: 2rem auto;

    @media (max-width: 750px) {
      margin: 1rem auto;
    }

    p {
      font-size: ${pxToRem(24)};
      color: #37aa5c;
    }

    svg {
      animation: ${rotateSpinner} 1.5s linear infinite;
      color: #37aa5c;
    }
  `}
`
