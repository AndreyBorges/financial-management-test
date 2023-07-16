export type IModal =
  | 'createTransaction'
  | 'editTransaciton'
  | 'deleteTransaction'
  | 'createCategory'
  | 'listCategory'
  | 'editCategory'
  | 'deleteCategory'
  | 'modalClose'

export interface IModalState {
  modal: IModal
  prevModal?: IModal
}
