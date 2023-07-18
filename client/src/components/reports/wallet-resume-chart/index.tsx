import { BoxChart, Chart } from '@/components'

import { useTheme } from 'styled-components'

const WalletResumeChart = () => {
  const theme = useTheme()
  return (
    <BoxChart title='Resumo de carteira'>
      <Chart
        typeChart='line'
        labels={['Salario', 'Comida', 'Investimento']}
        datasets={[
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
        ]}
        position='bottom'
      />
    </BoxChart>
  )
}

export default WalletResumeChart
