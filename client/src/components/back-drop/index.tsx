import React from 'react'
import { BackDropWrapper } from './styles'
import { useModal } from '@/hook'

const BackDrop = () => {
  const { handleOpenModal } = useModal()
  return <BackDropWrapper onClick={() => handleOpenModal()} />
}

export default BackDrop
