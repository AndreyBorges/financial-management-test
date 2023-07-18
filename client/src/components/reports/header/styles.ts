import { css, styled } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`

interface SummaryCardProps {
  variant?: 'green'
  color?: 'total' | 'income' | 'outcome'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  ${({ theme, variant, color }) => css`
    background: ${variant ? theme.green900 : theme.gray50};
    border-radius: 6px;
    padding: 2rem;
    box-shadow: 0 0 30px -10px ${theme.gray400};

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${color === 'total'
        ? theme.gray50
        : color === 'income'
        ? theme.green450
        : color === 'outcome'
        ? theme.red400
        : theme.gray450};

      span {
        text-transform: capitalize;
      }
    }

    strong {
      color: ${color === 'total' ? theme.gray50 : theme.green800};
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
    }
  `}
`
