import { WarningCircle } from '@phosphor-icons/react'
import { TransactionsNotFoundWrapper } from './styles'
import { useFilter, useTransactions } from '@/hook'

const TransactionsNotFound = () => {
  const { handleClearFilter } = useFilter()
  const { handleRefreshTransactions } = useTransactions()

  const handleReloadTransactions = () => {
    handleClearFilter()
    handleRefreshTransactions()
  }
  return (
    <TransactionsNotFoundWrapper>
      <WarningCircle size={128} weight='bold' />
      <div>
        <p>Nenhuma transação encontrada.</p>
        <p>Tente novamente!</p>
      </div>

      <button onClick={handleReloadTransactions}>Recarregar transações</button>
    </TransactionsNotFoundWrapper>
  )
}

export default TransactionsNotFound
