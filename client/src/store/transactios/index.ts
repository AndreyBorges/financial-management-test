import { IInfoTransactionsDTO, ITransaction } from '@/interfaces'
import { atom } from 'jotai'

interface ITransactionsState {
  currentTransaction: ITransaction | null
  transactions: ITransaction[]
  isLoading: boolean
  error: string | null
  success: string | null
  refreshData?: boolean
  info?: IInfoTransactionsDTO
}

const transactionDefaultValue = atom<ITransactionsState>({
  currentTransaction: null,
  transactions: [],
  isLoading: false,
  error: null,
  success: null,
  refreshData: false,
  info: {
    size: 0,
    page: 0,
    total: 0,
    nextPage: null,
    prevPage: null,
    totalPages: 0,
    limit: 0,
    totalInPage: 0
  }
})

export const transactionAtom = atom(
  get => get(transactionDefaultValue),
  (get, set, update: Partial<ITransactionsState>) => {
    set(transactionDefaultValue, { ...get(transactionDefaultValue), ...update })
  }
)
