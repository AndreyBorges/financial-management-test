import React from 'react'
import { BoxChart } from '@/components'
import { useTheme } from 'styled-components'
import { Bar } from 'react-chartjs-2'
import { MostHighValuesInCategoryData } from '@/interfaces'
import { useReports } from '@/hook'

const MostHighValuesInCategoryChart = () => {
  const theme = useTheme()
  const { state } = useReports()

  const labels = state?.mostHighValuesInCategoryChart.label as string[]
  const data = state?.mostHighValuesInCategoryChart.data as MostHighValuesInCategoryData[]

  return (
    <BoxChart title='Transações mais altas por categoria'>
      <Bar
        data={{
          labels: labels,
          datasets: ['Entrada', 'Saída'].map((label, index) => {
            return {
              label: label,
              data: data.map(item => {
                return index ? item.outcome : item.income
              }),
              backgroundColor: [index ? theme.error : theme.green450],
              borderWidth: 0
            }
          })
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

export default MostHighValuesInCategoryChart
