import { css, styled } from 'styled-components'
import { pxToRem } from '@/utils'

export const FilterWrapper = styled.form`
  ${({ theme }) => css`
    width: calc(100% - 32px);
    max-width: 1220px;
    margin-inline: auto;
    padding: ${pxToRem(32)};
    border-radius: 12px;
    background: ${theme.gray50};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 0 50px -10px ${theme.gray400};
    margin-top: calc(${pxToRem(90)} + ${pxToRem(64)});

    h1 {
      font-size: ${pxToRem(32)};
      color: ${theme.green800};
      letter-spacing: 0.1rem;
      opacity: 0.8;
      margin-bottom: 1rem;
    }
    @media (max-width: 750px) {
      margin: 2rem auto 0;
      margin-top: calc(${pxToRem(90)} + ${pxToRem(64)});
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
        box-shadow: 0 0 0 1px #37aa5c;

        background: ${theme.gray50};
        color: ${theme.green800};
        padding: 1.25rem 1rem;
        font-size: ${pxToRem(16)};

        &::placeholder {
          color: ${theme.green800};
          opacity: 0.8;
        }
      }
    }
    @media (max-width: 750px) {
      grid-template-columns: 1fr;
      gap: 0.5rem;
      > div {
      }
    }
  `}
`
export const FilterSelects = styled.div`
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
`

export const FilterButtons = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 750px) {
      gap: 0.5rem;
    }
  `}
`

export const RangeInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: ${pxToRem(-18)};
  span {
    display: block;
    height: 18px;
    color: #37aa5c;
    letter-spacing: 0.1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media (max-width: 750px) {
    span {
      margin-bottom: 0.25rem;
    }
    margin-top: 0;

    gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
  }
`
