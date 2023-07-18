import { useFilter, useModal, useTransactions } from '@/hook'
import { ModalType } from '@/interfaces'
import { WarningCircle } from '@phosphor-icons/react'
import { TransactionsNotFoundWrapper } from './styles'

const TransactionsNotFound = () => {
  const { handleClearFilter } = useFilter()
  const { handleRefreshTransactions, state } = useTransactions()
  const { handleOpenModal } = useModal()

  const handleReloadTransactions = () => {
    handleClearFilter()
    handleRefreshTransactions()
  }
  return (
    <TransactionsNotFoundWrapper>
      <WarningCircle size={128} weight='bold' />
      <div>
        <p>Nenhuma transação encontrada.</p>
        <p>{state.info?.total ? 'Tente novamente!' : 'Adicione uma nova transação!'}</p>
      </div>

      <button
        onClick={
          state.info?.total
            ? handleReloadTransactions
            : () => handleOpenModal(ModalType.CREATE_TRANSACTION)
        }
      >
        {state.info?.total ? 'Recarregar transações' : 'Adicionar transação'}
      </button>
    </TransactionsNotFoundWrapper>
  )
}

export default TransactionsNotFound
