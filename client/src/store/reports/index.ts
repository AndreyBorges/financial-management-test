import { atom } from 'jotai'
import { IReportsStateDTO } from '@/interfaces'

export const reportsDefaultValue: IReportsStateDTO = {
  state: {
    balance: {
      income: 0,
      outcome: 0,
      total: 0
    },
    walletChart: {
      label: [],
      data: []
    },
    totalTransactionsByCategoryChart: {
      label: [],
      data: [],
      options: {
        colors: []
      }
    },
    mostHighValuesInCategoryChart: {
      label: [],
      data: []
    }
  },
  isLoading: false,
  error: ''
}

const reportsDefaultAtom = atom<IReportsStateDTO>(reportsDefaultValue)

export const reportsAtom = atom(
  get => get(reportsDefaultAtom),
  (get, set, update: IReportsStateDTO) => {
    set(reportsDefaultAtom, { ...get(reportsDefaultAtom), ...update })
  }
)
