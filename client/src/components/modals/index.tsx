import { useModal } from '@/hook'

import {
  ModalTransaction,
  ModalEditTransaction,
  ModalCategory,
  ModalDeleteTransaction,
  ModalListCategory,
  ModalEditCategory,
  ModalDeleteCategory
} from './shared'
import { ModalType } from '@/interfaces'

const Modals = () => {
  const { state } = useModal()
  const { modal } = state

  switch (modal) {
    case ModalType.CREATE_TRANSACTION:
      return <ModalTransaction />
    case ModalType.EDIT_TRANSACTION:
      return <ModalEditTransaction />
    case ModalType.DELETE_TRANSACTION:
      return <ModalDeleteTransaction />
    
    case ModalType.CREATE_CATEGORY:
      return <ModalCategory />
    case ModalType.LIST_CATEGORY:
      return <ModalListCategory />
    case ModalType.EDIT_CATEGORY:
      return <ModalEditCategory />
    case ModalType.DELETE_CATEGORY:
      return <ModalDeleteCategory />
    default:
      return null
  }
}

export default Modals
