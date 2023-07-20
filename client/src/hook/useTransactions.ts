import {
  ICreateTransactionDTO,
  IGetAllTransactionsQueryOptions,
  ITransaction,
  IUpdadeTransactionDTO
} from '@/interfaces'
import { transactionsService } from '@/services'
import { transactionAtom } from '@/store'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'

const useTransactions = () => {
  const [state, setState] = useAtom(transactionAtom)
  const { refreshData } = state

  const handleGetAllTransactions = async (param?: IGetAllTransactionsQueryOptions) => {
    setState({ isLoading: true })
    const { data, error, success } = await transactionsService.getAll(param)
    if (success && data) {
      const { data: transactions, ...info } = data

      setState({
        transactions,
        info
      })
    }
    if (error) setState({ error: error.message })
    setState({ isLoading: false })
  }

  const handleCreateTransaction = async (createTransactionDTO: ICreateTransactionDTO) => {
    setState({ isLoading: true })

    const { data, error, success } = await transactionsService.create(createTransactionDTO)

    if (success && data) {
      handleRefreshTransactions()
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
    if (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      setState({ error: error.message })
    }

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
    if (success && data) {
      handleRefreshTransactions()
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
    if (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      setState({ error: error.message })
    }
    setState({ isLoading: false })
  }

  const handleUpdateTransaction = async (updateTransactionDTO: IUpdadeTransactionDTO) => {
    setState({ isLoading: true })

    const { data, error, success } = await transactionsService.update(updateTransactionDTO)
    if (success && data) {
      handleRefreshTransactions()
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
    if (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      setState({ error: error.message })
    }
    setState({ isLoading: false })
  }

  const handleSetCurrentTransaction = (transactions: ITransaction) => {
    setState({ currentTransaction: transactions })
  }

  const handleRefreshTransactions = () => {
    setState({ refreshData: !refreshData })
  }

  return {
    state,
    handleCreateTransaction,
    handleDeleteTransaction,
    handleUpdateTransaction,
    handleGetOneTransaction,
    handleRefreshTransactions,
    handleSetCurrentTransaction,
    handleGetAllTransactions
  }
}

export default useTransactions
