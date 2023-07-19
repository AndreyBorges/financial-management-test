import { BoxChart } from '@/components'

import { useReports } from '@/hook'
import { Line } from 'react-chartjs-2'
import { useTheme } from 'styled-components'
import { WalletResumeChartWrapper } from './styles'

const WalletResumeChart = () => {
  const theme = useTheme()
  const { state } = useReports()
  const labels = state?.walletChart.label as string[]
  const data = state?.walletChart.data as Array<number[]>
  const label = ['Entrada', 'Saida', 'Média']
  const color = [theme.success, theme.error, theme.warning]

  return (
    <WalletResumeChartWrapper>
      <BoxChart title='Resumo de carteira'>
        <Line
          data={{
            labels,
            datasets: data.map((item, index) => ({
              label: label[index],
              data: item,
              backgroundColor: color[index],
              borderColor: color[index],
              borderWidth: 3
            }))
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }}
        />
      </BoxChart>
    </WalletResumeChartWrapper>
  )
}

export default WalletResumeChart
