import { ITransaction } from '@/interfaces'
import { atom } from 'jotai'


interface ITransactionsState {
  currentTransaction: ITransaction | null
  transactions: ITransaction[]
  isLoading: boolean
  error: string | null
  success: string | null
  refreshData?: boolean
}

const transactionDefaultValue = atom<ITransactionsState>({
  currentTransaction: null,
  transactions: [],
  isLoading: false,
  error: null,
  success: null,
  refreshData: false
})

export const transactionAtom = atom(
  get => get(transactionDefaultValue),
  (get, set, update: Partial<ITransactionsState>) => {
    set(transactionDefaultValue, { ...get(transactionDefaultValue), ...update })
  }
)
