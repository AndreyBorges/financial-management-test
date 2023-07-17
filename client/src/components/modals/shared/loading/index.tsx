import { BackDrop } from '@/components'
import { SpinnerGap } from 'phosphor-react'
import { LoadingWrapper } from './styles'

const Loading = () => {
  return (
    <>
      <LoadingWrapper>
        <SpinnerGap size={62} weight='bold' />
      </LoadingWrapper>
      <BackDrop />
    </>
  )
}

export default Loading
