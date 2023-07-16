import { atom } from 'jotai'
import { IModalState, ModalType } from '@/interfaces'

const modalDefaultValue = atom<IModalState>({
  modal: ModalType.NULL,
  prevModal: undefined
})

export const modalAtom = atom(
  get => get(modalDefaultValue),
  (get, set, update: Partial<IModalState>) => {
    set(modalDefaultValue, { ...get(modalDefaultValue), ...update })
  }
)
