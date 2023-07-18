import { ICommonResponseDTO, TransactionType } from '.'

export interface ITransaction {
  id: number
  description: string
  amount: number
  type: string
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface IGetAllTransactionsQueryOptions {
  page?: number
  limit?: number
  description?: string
  amount?: number
  type?: TransactionType
  category?: string
}
export interface IGetOneOrDeleteTransactionsQueryOptions {
  id: number
}

export interface IGetAllTransactionsResponseDTO extends IInfoTransactionsDTO {
  data: ITransaction[]
}

export interface IInfoTransactionsDTO {
  size: number
  page: number
  total: number
  nextPage: number | null
  prevPage: number | null
  totalPages: number
  limit: number
  totalInPage: number
}

export interface ICreateTransactionDTO {
  description: string
  amount: number
  category: string
  type: string
}

// export interface ICurrentTransactionDTO extends ICreateTransactionDTO { }

export interface IStateTransactionDTO extends Partial<ICreateTransactionDTO> {}

export interface IUpdadeTransactionDTO extends Partial<ICreateTransactionDTO> {
  id?: number
}

export interface IGetOneTransactionsResponseDTO extends ICommonResponseDTO<ITransaction> {}

export interface ICreateTransactionResponseDTO extends ICommonResponseDTO<ITransaction> {}

export interface IUpdateTransactionResponseDTO extends ICommonResponseDTO<ITransaction> {}

export interface IDeleteOneTransactionsResponseDTO extends ICommonResponseDTO<null> {}
