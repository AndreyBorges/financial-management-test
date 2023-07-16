import { atom } from 'jotai'
import { ICategory } from '@/interfaces'

interface ICategoriesState {
  categories: ICategory[]
  isLoading: boolean
  error: string | null
  success: string | null
  refreshData?: boolean
  currentCategory: ICategory
}

const categoryDefaultValue = atom<ICategoriesState>({
  categories: [],
  isLoading: false,
  error: null,
  success: null,
  refreshData: false,
  currentCategory: {} as ICategory
})

export const categoryAtom = atom(
  get => get(categoryDefaultValue),
  (get, set, update: Partial<ICategoriesState>) => {
    set(categoryDefaultValue, { ...get(categoryDefaultValue), ...update })
  }
)
