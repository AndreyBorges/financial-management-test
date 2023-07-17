import { IFilterState, TransactionType } from '@/interfaces'
import { atom } from 'jotai'

export const filterDefaultValue = {
  filterState: {
    description: '',
    gte: 0,
    lte: 0,
    category: '',
    type: '' as TransactionType
  }
}

const filterDefaultAtom = atom<IFilterState>(filterDefaultValue)

export const filterAtom = atom(
  get => get(filterDefaultAtom),
  (get, set, update: IFilterState) => {
    set(filterDefaultAtom, { ...get(filterDefaultAtom), ...update })
  }
)
