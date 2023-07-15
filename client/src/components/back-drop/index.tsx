import React from 'react'
import { BackDropWrapper } from './styles'

interface IBackDropProps {
  onClick: () => void
}

const BackDrop = ({ onClick }: IBackDropProps) => {
  return <BackDropWrapper onClick={onClick} />
}

export default BackDrop
