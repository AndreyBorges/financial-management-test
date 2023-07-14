import { TransactionType } from "../enums";

export class CreateTransactionDto {
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}
