interface BalanceData {
  income: number;
  outcome: number;
  total: number;
}

interface ReportData {
  income: number;
  outcome: number;
  average: number;
}

interface MoreIncomeExpensiveByCategoryData {
  income: number;
  outcome: number;
}

interface WalletChart {
  label: string[];
  data: Array<number[]>;
}

interface TotalTransactionsByCategoryChart {
  label: string[];
  data: number[];
  options: {
    colors: string[];
  };
}

interface MostHighValuesInCategoryChart {
  label: string[];
  data: MoreIncomeExpensiveByCategoryData[];
}

interface ReportsDTO {
  message: string;
  data: {
    balance: BalanceData;
    walletChart: WalletChart;
    totalTransactionsByCategoryChart: TotalTransactionsByCategoryChart;
    mostHighValuesInCategoryChart: MostHighValuesInCategoryChart;
  };
}
