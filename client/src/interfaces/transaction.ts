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
}
export interface IGetOneOrDeleteTransactionsQueryOptions {
  id: number
}

export interface IGetAllTransactionsResponseDTO {
  size: number
  page: number
  total: number
  nextPage: number | null
  prevPage: number | null
  totalPages: number
  limit: number
  data: ITransaction[]
}

export interface ICreateTransactionDTO {
  description: string
  amount: number
  category: string
  type: string
}

export interface IStateTransactionDTO extends Partial<ICreateTransactionDTO> {}

export interface IUpdadeTransactionDTO extends Partial<ICreateTransactionDTO> {
  id: number
}

export interface ICommonResponseDTO<T> {
  message?: string
  data?: T
}

export interface IGetOneTransactionsResponseDTO extends ICommonResponseDTO<ITransaction> {}

export interface ICreateTransactionResponseDTO extends ICommonResponseDTO<ITransaction> {}

export interface IUpdateTransactionResponseDTO extends ICommonResponseDTO<ITransaction> {}

export interface IDeleteOneTransactionsResponseDTO extends ICommonResponseDTO<null> {}
