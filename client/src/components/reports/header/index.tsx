import { useReports } from '@/hook'
import { handleMaskValue } from '@/utils'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from '@phosphor-icons/react'
import { SummaryCard, SummaryContainer } from './styles'

const HeaderReports = () => {
  const { state } = useReports()
  const totalIncome = state?.balance.income as number
  const totalOutcome = state?.balance.outcome as number
  const total = state?.balance.total as number

  return (
    <SummaryContainer>
      <SummaryCard color='income'>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#00b37e' />
        </header>

        <strong>{handleMaskValue(totalIncome)}</strong>
      </SummaryCard>
      <SummaryCard color='outcome'>
        <header>
          <span>Saida</span>
          <ArrowCircleDown size={32} color='#f75a68' />
        </header>
        <strong>{handleMaskValue(totalOutcome)}</strong>
      </SummaryCard>
      <SummaryCard variant='green' color='total'>
        <header>
          <span>total</span>
          <CurrencyDollar size={32} color='#FFF' />
        </header>
        <strong>{handleMaskValue(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}

export default HeaderReports
