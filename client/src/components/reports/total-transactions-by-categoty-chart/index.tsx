import { BoxChart } from '@/components'
import { useReports } from '@/hook'
import { Pie } from 'react-chartjs-2'

const TotalTransactionsByCategoryChart = () => {
  const { state } = useReports()
  const labels = state?.totalTransactionsByCategoryChart.label as string[]
  const data = state?.totalTransactionsByCategoryChart.data as number[]
  const colors = state?.totalTransactionsByCategoryChart.options.colors as string[]

  return (
    <BoxChart title='Total transações por categoria'>
      <Pie
        data={{
          labels,
          datasets: [
            {
              label: 'Total de transações',
              data: data,
              backgroundColor: colors,
              borderWidth: 0
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'left'
            }
          }
        }}
      />
    </BoxChart>
  )
}

export default TotalTransactionsByCategoryChart
