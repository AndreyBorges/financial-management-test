import { TransactionType } from '../enums';

export interface SearchTransactionDto {
  page: number;
  limit: number;
  description?: string;
  gte?: number;
  lte?: number;
  amount?: number;
  type?: TransactionType;
  category?: string;
}
