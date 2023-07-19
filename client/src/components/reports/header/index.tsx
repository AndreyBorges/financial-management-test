import { useTransactions } from '@/hook'
import { ITransaction } from '@/interfaces'
import { handleMaskValue } from '@/utils'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { SummaryCard, SummaryContainer } from './styles'

const HeaderReports = () => {
  const { state, handleGetAllTransactions } = useTransactions()

  const [newTransactions, setNewTransactions] = useState<ITransaction[]>([])

  const { transactions, info } = state
  const totalIncome = newTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + transaction.amount
    }
    return acc
  }, 0)
  const totalOutcome = newTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'outcome') {
      return acc + transaction.amount
    }
    return acc
  }, 0)

  const total = totalIncome - totalOutcome

  const isOwed = totalIncome > totalOutcome

  useEffect(() => {
    if (!info) return
    handleGetAllTransactions({
      page: 1,
      limit: info?.total
    })
    setNewTransactions(transactions)
  }, [])

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
