import { transactionsService } from '@/services'
import { transactionAtom } from '@/store'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { ICreateTransactionDTO, IUpdadeTransactionDTO } from '../interfaces'

const useTransactions = () => {
  const [state, setState] = useAtom(transactionAtom)
  const [refreshData, setRefreshData] = useState(false)

  const handleGetAllTransactions = async () => {
    setState({ isLoading: true })
    const { data, error, success } = await transactionsService.getAll({
      limit: 10,
      page: 1
    })
    if (success && data)
      setState({
        transactions: data.data
      })
    if (error) setState({ error: error.message })
    setState({ isLoading: false })
  }

  const handleCreateTransaction = async (createTransactionDTO: ICreateTransactionDTO) => {
    setState({ isLoading: true })

    const { data, error, success } = await transactionsService.create(createTransactionDTO)

    if (success && data) setState({ success: data.message })
    if (error) setState({ error: error.message })
    handleRefreshTransactions()
    setState({ isLoading: false })
  }

  const handleGetOneTransaction = async (id: number) => {
    setState({ isLoading: true })

    const { data, error, success } = await transactionsService.getOne({ id })
    if (success && data) setState({ currentTransaction: data.data, success: data.message })
    if (error) setState({ error: error.message })
    setState({ isLoading: false })
  }

  const handleDeleteTransaction = async (id: number) => {
    setState({ isLoading: true })

    const { data, error, success } = await transactionsService.remove({ id })
    if (success && data) setState({ success: data.message })
    if (error) setState({ error: error.message })
    handleRefreshTransactions()
    setState({ isLoading: false })
  }

  const handleUpdateTransaction = async (updateTransactionDTO: IUpdadeTransactionDTO) => {
    setState({ isLoading: true })

    const { data, error, success } = await transactionsService.update(updateTransactionDTO)
    if (success && data) setState({ success: data.message })
    if (error) setState({ error: error.message })
    handleRefreshTransactions()
    setState({ isLoading: false })
  }

  const handleRefreshTransactions = () => {
    setRefreshData(!refreshData)
  }

  useEffect(() => {
    handleGetAllTransactions()
  }, [refreshData])

  return {
    state,
    handleCreateTransaction,
    handleDeleteTransaction,
    handleUpdateTransaction,
    handleGetOneTransaction,
    handleRefreshTransactions
  }
}

export default useTransactions
