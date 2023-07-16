import { Button, Header, Modals } from '@/components'

import { useCategories, useTransactions } from '@/hook'
import { useEffect } from 'react'

export default function Home() {
  const {
    state: stateTransactions,
    handleSetCurrentTransaction,
    handleDeleteCurrentTransaction,
    handleGetAllTransactions
  } = useTransactions()
  const { handleGetAllCategories, state: stateCategories } = useCategories()
  const { transactions, refreshData } = stateTransactions
  const { refreshData: refreshDataCategories } = stateCategories

  useEffect(() => {
    handleGetAllCategories()
  }, [refreshDataCategories])

  useEffect(() => {
    handleGetAllTransactions()
  }, [refreshData])

  return (
    <div>
      <Header />
      <Modals />

      {transactions.map(transaction => (
        <div
          key={transaction.id}
          style={{
            display: 'flex',
            gap: '1rem',
            marginBlock: '1rem'
          }}
        >
          <span>{transaction.description}</span>
          <span>{transaction.amount}</span>
          <span>{transaction.category}</span>
          <span>{transaction.type}</span>
          <Button onClick={() => handleSetCurrentTransaction(transaction)}>editar</Button>
          <Button onClick={() => handleDeleteCurrentTransaction(transaction)}>Deletar</Button>
        </div>
      ))}
    </div>
  )
}
