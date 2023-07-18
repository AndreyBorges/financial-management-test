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
  `}
`

export const BoxChartTitle = styled.h2`
  ${({ theme }) => css`
    letter-spacing: 0.1rem;
    color: ${theme.green700};
  `}
`

export const BoxChartContent = styled.div``

export const BoxChartFooter = styled.div``
