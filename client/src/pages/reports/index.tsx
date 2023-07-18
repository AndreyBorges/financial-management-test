import {
  Layout,
  HeaderReports,
  WrapperReports,
  WalletResumeChart,
  TotalTransactionsByCategoryChart,
  MostPopulousCategoryChart,
  MostExpensiveTransactionChart,
} from '@/components'
import { SecondChartWrapper } from '@/components/reports/wrapper/styles'

const Reports = () => {
  return (
    <Layout>
      <WrapperReports>
        <HeaderReports />
        <WalletResumeChart />
        <SecondChartWrapper>
          <TotalTransactionsByCategoryChart />
          <MostPopulousCategoryChart />
          <MostExpensiveTransactionChart />
        </SecondChartWrapper>
      </WrapperReports>
    </Layout>
  )
}

export default Reports
