import { INavBarProps, NavBarItem } from '@/interfaces'
import { atom } from 'jotai'

export const navBarDefaultValue = {
  state: NavBarItem.TRANSACTIONS
}

const navBarDefaultAtom = atom<INavBarProps>(navBarDefaultValue)

export const navBarAtom = atom(
  get => get(navBarDefaultAtom),
  (get, set, update: INavBarProps) => {
    set(navBarDefaultAtom, { ...get(navBarDefaultAtom), ...update })
  }
)
