import { ModalType } from './enum'
export interface IModalState {
  modal: ModalType
  prevModal: ModalType
  modalFlow: ModalType[]
}
