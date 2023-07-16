import { css, styled } from 'styled-components'
import { pxToRem } from '@/utils'
import Select from 'react-select'

export const StyledSelect = styled(Select)`
  ${({ theme }) => css`
    > div {
      color: ${theme.green50};
      width: 100%;
      border-radius: ${pxToRem(6)};
      border: 0;
      background: ${theme.green900};
      color: ${theme.green50};
      padding: 0.688rem 0.5rem;
      font-size: ${pxToRem(16)};
    }
    div {
      color: ${theme.green50};
    }
  `}
`
