export enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome'
}

export enum ModalType {
  CREATE_TRANSACTION = 'createTransaction',
  DETAILS_TRANSACTION = 'detailsTransaction',
  EDIT_TRANSACTION = 'editTransaciton',
  DELETE_TRANSACTION = 'deleteTransaction',

  CREATE_CATEGORY = 'createCategory',
  LIST_CATEGORY = 'listCategory',
  EDIT_CATEGORY = 'editCategory',
  DELETE_CATEGORY = 'deleteCategory',

  NULL = 'modalClose'
}

export enum NavBarItem {
  TRANSACTIONS = 'transactions',
  REPORTS = 'reports'
}
