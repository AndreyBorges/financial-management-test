import {
  Layout,
  HeaderReports,
  WrapperReports,
  WalletResumeChart,
  TotalTransactionsByCategoryChart,
  MostHighValuesInCategoryChart,
  Loading
} from '@/components'
import { SecondChartWrapper } from '@/components/reports/wrapper/styles'
import { useReports } from '@/hook'
import { useEffect } from 'react'

const Reports = () => {
  const { handleGetAllReports, isLoading } = useReports()

  useEffect(() => {
    handleGetAllReports()
  }, [])

  return (
    <Layout>
      <WrapperReports>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <HeaderReports />
            <WalletResumeChart />
            <SecondChartWrapper>
              <TotalTransactionsByCategoryChart />
              <MostHighValuesInCategoryChart />
            </SecondChartWrapper>
          </>
        )}
      </WrapperReports>
    </Layout>
  )
}

export default Reports
