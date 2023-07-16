export enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome'
}

export enum ModalType {
  CREATE_TRANSACTION = 'createTransaction',
  EDIT_TRANSACTION = 'editTransaciton',
  DELETE_TRANSACTION = 'deleteTransaction',
  
  CREATE_CATEGORY = 'createCategory',
  LIST_CATEGORY = 'listCategory',
  EDIT_CATEGORY = 'editCategory',
  DELETE_CATEGORY = 'deleteCategory',

  NULL = 'modalClose'
}
