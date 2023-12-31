import { ModalType } from '@/interfaces'
import { modalAtom, modalDefaultValue } from '@/store'
import { useAtom } from 'jotai'
import { useMediaQuery } from '.'

const useModal = () => {
  const [state, setState] = useAtom(modalAtom)
  const isMobile = useMediaQuery('(max-width: 750px)')
  const { modalFlow } = state

  const handleOpenModal = (type: ModalType = ModalType.NULL) => {
    if (type === ModalType.NULL) return setState(modalDefaultValue)

    const lastModals = [
      ModalType.EDIT_CATEGORY,
      ModalType.DELETE_CATEGORY,
      ModalType.CREATE_CATEGORY,
      ModalType.LIST_CATEGORY,
      isMobile && ModalType.DELETE_TRANSACTION
    ].filter(Boolean)

    const setModalFlow = new Set([...modalFlow, type])

    const modalFlowArray = Array.from(setModalFlow)

    if (isMobile && ModalType.EDIT_TRANSACTION === type) {
      return setState({
        modal: type,
        prevModal: modalFlow[0],
        modalFlow: modalFlowArray
      })
    }

    if (lastModals.includes(type)) {
      modalFlowArray.pop()
      return setState({
        modal: type,
        prevModal: modalFlow[modalFlow.length - 1],
        modalFlow: modalFlowArray
      })
    }

    setState({
      modal: type,
      modalFlow: modalFlowArray
    })
  }
  return {
    handleOpenModal,
    state
  }
}

export default useModal
