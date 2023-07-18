import React, { FC } from 'react'
import { StyledWrapper } from './styles'

interface IWrapperReportsProps {
  children: React.ReactNode
}

const WrapperReports: FC<IWrapperReportsProps> = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>
}

export default WrapperReports
