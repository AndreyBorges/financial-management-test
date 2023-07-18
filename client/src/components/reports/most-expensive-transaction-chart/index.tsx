import React from 'react'
import { BoxChart, Chart } from '@/components'
import { useTheme } from 'styled-components'

const MostExpensiveTransactionChart = () => {
  const theme = useTheme()

  return (
    <BoxChart title='Transações mais altas'>
      <Chart
        typeChart='bar'
        labels={['Bonus', 'Salario', 'Online']}
        datasets={[
          {
            label: 'Entrada',
            data: [78, 19, 218],
            backgroundColor: [theme.green450, theme.warning, theme.error],

            hoverOffset: 4,
            borderWidth: 0
          }
        ]}
        position='bottom'
      />
    </BoxChart>
  )
}

export default MostExpensiveTransactionChart
