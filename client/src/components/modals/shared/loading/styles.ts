import { keyframes, styled, css } from 'styled-components'

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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    svg{
      animation: ${rotateSpinner} 1.5s linear infinite;
      color: ${theme.green900};
    }
  `}
`
