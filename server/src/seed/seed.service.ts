import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../modules/category/entities';
import { Transaction } from '../modules/transaction/entities';
import { TransactionType } from '../modules/transaction/enums';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createCategories(): Promise<Category[]> {
    const categories: Category[] = [];
    const categoryNames = [
      'Mercado',
      'Salário',
      'Investimento',
      'Compras',
      'Outros',
    ];
    for (const name of categoryNames) {
      const category = new Category();
      category.name = name;

      const generateColer = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++)
          color += letters[Math.floor(Math.random() * 16)];
        return color;
      };

      category.color = generateColer();

      categories.push(category);
    }
    return categories;
  }

  async createTransactions(categories: Category[]): Promise<Transaction[]> {
    const transactions: Transaction[] = [];
    const transactionNames = Array.from({ length: 30 }).map(() => {
      return faker.lorem.words(3);
    });
    const types = [TransactionType.INCOME, TransactionType.OUTCOME];
    for (const name of transactionNames) {
      const transaction = new Transaction();

      transaction.description = name;
      transaction.amount = Math.floor(Math.random() * 1000);
      transaction.category = categories[Math.floor(Math.random() * 5)];
      transaction.type = types[Math.floor(Math.random() * types.length)];

      transactions.push(transaction);
    }
    return transactions;
  }

  async save() {
    const categories = await this.createCategories();
    const transactions = await this.createTransactions(categories);

    categories.forEach((category) => {
      transactions.forEach((transaction) => {
        if (transaction.category.name === category.name) {
          transaction.category = category;
          category.quantity = category.quantity ? category.quantity + 1 : 1;
          const dateToSave = new Date(faker.date.recent(15));
          category.createdAt = dateToSave;
          category.updatedAt = dateToSave;
          transaction.createdAt = dateToSave;
          transaction.updatedAt = dateToSave;
        }
      });
    });

    await this.CategoryRepository.save(categories);
    await this.transactionRepository.save(transactions);

    return {
      message: 'Seed executado com sucesso!',
    };
  }
}
