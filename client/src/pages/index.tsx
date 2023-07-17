import { Header, Modals, TransactionsTable } from '@/components'

import { useCategories, useTransactions } from '@/hook'
import { useEffect } from 'react'

export default function Home() {
  const { state: stateTransactions, handleGetAllTransactions } = useTransactions()
  const { handleGetAllCategories, state: stateCategories } = useCategories()
  const { refreshData } = stateTransactions
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
      <TransactionsTable />
    </div>
  )
}
