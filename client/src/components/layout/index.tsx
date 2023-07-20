import { Footer, Header, Modals } from '@/components'

import { useCategories, useTransactions } from '@/hook'
import { FC, useEffect } from 'react'

const Layout: FC<{
  children?: React.ReactNode
}> = ({ children }) => {
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
    <>
      <Header />
      {children}
      <Footer />
      <Modals />
    </>
  )
}

export default Layout
