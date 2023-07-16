import React from 'react'
import { LoadingWrapper } from './styles'
import { SpinnerGap } from 'phosphor-react'
import { useModal } from '../../../../hook'
import BackDrop from '../../../back-drop'

const Loading = () => {
  const { handleOpenModal } = useModal()
  return (
    <>
      <LoadingWrapper>
        <SpinnerGap size={62} weight='bold' />
      </LoadingWrapper>
      <BackDrop onClick={handleOpenModal} />
    </>
  )
}

export default Loading
