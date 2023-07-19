import { BoxChart } from '@/components'

import { useTheme } from 'styled-components'
import { WalletResumeChartWrapper } from './styles'
import { Line } from 'react-chartjs-2'

const WalletResumeChart = () => {
  const theme = useTheme()
  return (
    <WalletResumeChartWrapper>
      <BoxChart title='Resumo de carteira'>
        <Line
          data={{
            labels: ['Salario', 'Comida', 'Investimento'],
            datasets: [
              {
                label: 'Entrada',
                data: [2, 4, 8],
                backgroundColor: [theme.green450],
                borderColor: [theme.green450],
                borderWidth: 3
              },
              {
                label: 'Media',
                data: [9, 2, 18],
                backgroundColor: [theme.warning],
                borderColor: [theme.warning],
                borderWidth: 3
              },
              {
                label: 'Saida',
                data: [90, 12, 18],
                backgroundColor: [theme.error],
                borderColor: [theme.error],
                borderWidth: 3
              }
            ]
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
