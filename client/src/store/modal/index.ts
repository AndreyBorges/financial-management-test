import { atom } from 'jotai'
import { IModalState, ModalType } from '@/interfaces'

export const modalDefaultValue = {
  modal: ModalType.NULL,
  prevModal: ModalType.NULL,
  modalFlow: []
}

const modalDefaultAtom = atom<IModalState>(modalDefaultValue)

export const modalAtom = atom(
  get => get(modalDefaultAtom),
  (get, set, update: Partial<IModalState>) => {
    set(modalDefaultAtom, { ...get(modalDefaultAtom), ...update })
  }
)
