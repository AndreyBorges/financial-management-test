import React from 'react'
import { LoadingWrapper } from './styles'
import { SpinnerGap } from '@phosphor-icons/react'

const Loading = () => {
  return (
    <LoadingWrapper>
      <SpinnerGap size={62} weight='bold' />
      <p>Carregando</p>
    </LoadingWrapper>
  )
}

export default Loading
