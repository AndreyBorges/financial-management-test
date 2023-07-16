import { useAtom } from 'jotai'
import { IModal, ModalType } from '@/interfaces'
import { modalAtom } from '@/store'

const useModal = () => {
  const [state, setState] = useAtom(modalAtom)

  const handleOpenModal = (type: IModal = ModalType.NULL) => {
    setState({ prevModal: state.modal })
    setState({ modal: type })
  }

  return {
    handleOpenModal,
    state
  }
}

export default useModal
