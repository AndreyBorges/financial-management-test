import { BackDrop } from '@/components'
import { SpinnerGap } from '@phosphor-icons/react'
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
