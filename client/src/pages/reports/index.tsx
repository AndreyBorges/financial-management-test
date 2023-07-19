import {
  Layout,
  HeaderReports,
  WrapperReports,
  WalletResumeChart,
  TotalTransactionsByCategoryChart,
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
          <MostExpensiveTransactionChart />
        </SecondChartWrapper>
      </WrapperReports>
    </Layout>
  )
}

export default Reports
