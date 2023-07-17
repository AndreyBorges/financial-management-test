import { TransactionType } from './enum'

export interface IFilter {
  description?: string
  gte?: number
  lte?: number
  type?: TransactionType
  category?: string

}

export interface IFilterState {
  filterState: IFilter
}
