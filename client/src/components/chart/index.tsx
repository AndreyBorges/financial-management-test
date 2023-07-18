import {
  Chart as ChartJS,
  ChartData,
  ChartTypeRegistry,
  registerables,
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions
} from 'chart.js'

import React, { FC, useEffect, useRef } from 'react'
import { BoxChartWrapper } from './styles'
import { ChartConfiguration } from 'chart.js'
import { _DeepPartialObject } from 'chart.js/dist/types/utils'

ChartJS.register(...registerables)

interface IBoxChartProps {
  typeChart: ChartConfiguration<keyof ChartTypeRegistry, number[], string>['type']
  labels: string[]
  datasets: ChartData<keyof ChartTypeRegistry, number[], string>['datasets']
  position?:
    | 'left'
    | 'top'
    | 'right'
    | 'bottom'
    | 'center'
    | 'chartArea'
    | _DeepPartialObject<{
        [scaleId: string]: number
      }>
}

const Chart: FC<IBoxChartProps> = ({ typeChart, labels, datasets, position }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const ctx = chartRef.current.getContext('2d')
    new ChartJS(ctx as CanvasRenderingContext2D, {
      type: typeChart,
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        plugins: {
          legend: {
            position
          }
        }
      }
    })
  }, [])

  return (
    <BoxChartWrapper>
      <canvas ref={chartRef}></canvas>
    </BoxChartWrapper>
  )
}

export default Chart
