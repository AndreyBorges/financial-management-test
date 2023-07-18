import { css, styled } from 'styled-components'
import { pxToRem } from '../../../utils'

export const WalletResumeChartWrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    background: ${theme.gray50};
    margin-inline: ${pxToRem(32)};
    gap: 1rem;

    canvas{
      width: 100%;
    }
  `}
`
