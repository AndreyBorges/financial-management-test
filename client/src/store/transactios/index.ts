import { atom } from 'jotai'
import { ITransaction } from '@/interfaces'


interface ITransactionsState {
  currentTransaction: ITransaction | null
  transactions: ITransaction[]
  isLoading: boolean
  error: string | null
  success: string | null
}

const transactionDefaultValue = atom<ITransactionsState>({
  currentTransaction: null,
  transactions: [],
  isLoading: false,
  error: null,
  success: null
})

export const transactionAtom = atom(
  get => get(transactionDefaultValue),
  (get, set, update: Partial<ITransactionsState>) => {
    set(transactionDefaultValue, { ...get(transactionDefaultValue), ...update })
  }
)
