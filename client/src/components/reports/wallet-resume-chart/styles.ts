import { css, styled } from 'styled-components'
import { pxToRem } from '@/utils'

export const WalletResumeChartWrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    background: ${theme.gray50};
    gap: 1rem;
    border-radius: 16px;
  `}
`
