import { css, styled } from 'styled-components'
import { pxToRem } from '@/utils'
import Select from 'react-select'

interface IStyledSelectProps {
  backgroundProp?: string
  colorProp?: string
  boxShadowProp?: string
}

export const StyledSelect = styled(Select)<IStyledSelectProps>`
  ${({ theme, backgroundProp, colorProp, boxShadowProp }) => css`
    > div {
      width: 100%;
      border-radius: ${pxToRem(6)};
      border: 0;
      background: ${backgroundProp ? backgroundProp : theme.green900};
      padding: 0.688rem 0.5rem;
      font-size: ${pxToRem(16)};
      box-shadow: ${boxShadowProp ? boxShadowProp : 'none'};
    }
    div {
      color: ${colorProp ? colorProp : theme.green50};
    }
  `}
`
