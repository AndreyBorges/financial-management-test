import styled, { css } from 'styled-components'

export const BoxChartWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.gray50};
    width: 100%;
    gap: 1rem;
    border-radius: 6px;
    padding: 2rem;
    box-shadow: 0 0 30px -10px ${theme.gray400};

    @media (max-width: 425px) {
      padding: 24px;
    }
  `}
`

export const BoxChartTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.green700};
    height: 60px;
    width: 100%;
  `}
`

export const BoxChartContent = styled.div``

export const BoxChartFooter = styled.div``
