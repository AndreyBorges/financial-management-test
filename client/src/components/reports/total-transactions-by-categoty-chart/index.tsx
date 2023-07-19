import React from 'react'
import { BoxChart } from '@/components'
import { useTheme } from 'styled-components'
import { Pie } from 'react-chartjs-2'

const TotalTransactionsByCategoryChart = () => {
  const theme = useTheme()

  return (
    <BoxChart title='Total transações por categoria'>
      <Pie
        data={{
          labels: ['Bonus', 'Salario', 'Online'],
          datasets: [
            {
              label: 'Entrada',
              data: [78, 19, 218],
              backgroundColor: [theme.green450, theme.warning, theme.error],
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
