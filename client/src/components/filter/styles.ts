import { css, styled } from 'styled-components'
import { pxToRem } from '@/utils'

export const FilterWrapper = styled.form`
  ${({ theme }) => css`
    width: calc(100% - 32px);
    max-width: 1220px;
    margin: 4rem auto 0;
    padding: ${pxToRem(32)};
    border-radius: 12px;
    background: ${theme.gray50};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 0 50px -10px ${theme.gray400};

    h1 {
      font-size: ${pxToRem(32)};
      color: ${theme.green800};
      letter-spacing: 0.1rem;
      opacity: 0.8;
      margin-bottom: 1rem;
    }
    @media (max-width: 750px) {
      gap: 0.5rem;
      h1 {
        font-size: ${pxToRem(24)};
        margin-bottom: 0.5rem;
      }
    }
  `}
`

export const FilterInputs = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;

    > div {
      width: 100%;
      input {
        width: 100%;
        border-radius: ${pxToRem(6)};
        border: 0;
        background: ${theme.gray50};
        color: ${theme.green800};
        padding: 1.25rem 1rem;
        font-size: ${pxToRem(16)};
        box-shadow: 0 0 0 1px #37aa5c;

        &::placeholder {
          color: ${theme.green800};
          opacity: 0.8;
        }
      }
    }
    @media (max-width: 750px) {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  `}
`
export const FilterSelects = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;

    > div:first-of-type {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    @media (max-width: 750px) {
      grid-template-columns: 1fr;
      gap: 0.5rem;
      > div:first-of-type {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }

      button {
        align-self: flex-end;
        gap: 0.5rem;
        padding: 0.81rem;
      }
    }
  `}
`

export const FilterButtons = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      box-shadow: 0 0 0 1px #37aa5c;
      color: #37aa5c;
      border-radius: 6px;
      text-transform: uppercase;
      font-weight: 600;
      padding: 0.5rem 1rem;

      svg {
        color: #37aa5c;
      }

      &:hover {
        background: #37aa5c;
        color: ${theme.gray50};
        svg {
          color: ${theme.green50};
        }
      }
    }
    @media (max-width: 750px) {
      gap: 0.5rem;

      button {
        align-self: flex-end;
        gap: 0.5rem;
        padding: 0.81rem;
      }
    }
  `}
`
