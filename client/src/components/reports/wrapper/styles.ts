import { css, styled } from 'styled-components'

export const StyledWrapper = styled.main`
  ${({ theme }) => css`
    max-width: 1220px;
    margin: 0 auto;
    margin-top: calc(114px + 32px);
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: 750px) {
      gap: 1rem;
    }
  `}
`

export const SecondChartWrapper = styled.div`
  max-width: calc(1220px - 2.25rem);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 1rem;

  padding: 0px;
  > div {
    padding: 30px;
    margin-left: 2px;
  }

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    > div {
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 425px) {
    gap: 0.5rem;
    > div {
      padding: 24px;
    }
  }

  @media (max-width: 375px) {
    > div {
      padding: 6px;
    }
  }
`
