import React, { FC } from 'react'

import { BoxChartTitle, BoxChartWrapper, BoxChartContent } from './styles'

interface BoxChartProps {
  title: string
  children: React.ReactNode
}

const BoxChart: FC<BoxChartProps> = ({ title, children }) => {
  return (
    <BoxChartWrapper>
      <BoxChartTitle>{title}</BoxChartTitle>
      <BoxChartContent>{children}</BoxChartContent>
    </BoxChartWrapper>
  )
}

export default BoxChart
