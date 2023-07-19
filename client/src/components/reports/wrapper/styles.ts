import { css, styled } from 'styled-components'

export const StyledWrapper = styled.main`
  ${({ theme }) => css`
    max-width: 1220px;
    margin: 0 auto;
    margin-top: calc(114px + 32px);
    padding: 0 10px;
    display: flex;
    flex-direction: column;
  `}
`

export const SecondChartWrapper = styled.div`
  margin-block: 1.5rem;
  max-width: calc(1220px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 1.5rem;

  padding: 0px;
  > div {
    padding: 32px;
  }

  @media (max-width: 1280px) {
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    > div {
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    > div {
    }
  }

  @media (max-width: 425px) {
    > div {
      padding: 24px;
    }
  }
`
