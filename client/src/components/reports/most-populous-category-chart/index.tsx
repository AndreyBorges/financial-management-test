import React from 'react'
import { BoxChart } from '@/components'
import { useTheme } from 'styled-components'
import { Bar } from 'react-chartjs-2'

const MostPopulousCategoryChart = () => {
  const theme = useTheme()
  return (
    <BoxChart title='Categorias com mais transações'>
      <Bar
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
              position: 'bottom'
            }
          }
        }}
      />
    </BoxChart>
  )
}

export default MostPopulousCategoryChart
