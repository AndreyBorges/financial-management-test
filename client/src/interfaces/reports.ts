interface BalanceData {
  income: number
  outcome: number
  total: number
}

export interface ReportData {
  income: number
  outcome: number
  average: number
}

export interface MostHighValuesInCategoryData {
  income: number
  outcome: number
}

interface WalletChart {
  label: string[]
  data: Array<number[]>
}


interface TotalTransactionsByCategoryChart {
  label: string[]
  data: number[]
  options: {
    colors: string[]
  }
}

interface MostHighValuesInCategoryChart {
  label: string[]
  data: MostHighValuesInCategoryData[]
}

export interface IReportsResponseDTO {
  message: string
  data: {
    balance: BalanceData
    walletChart: WalletChart
    totalTransactionsByCategoryChart: TotalTransactionsByCategoryChart
    mostHighValuesInCategoryChart: MostHighValuesInCategoryChart
  }
}

export interface IReportsStateDTO {
  state?: IReportsResponseDTO['data']
  isLoading?: boolean
  error?: string | null
}
