import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import {
  CreateTransactionDto,
  SearchTransactionDto,
  UpdateTransactionDto,
} from './dto';
import { Transaction } from './entities';
import { CategoryService } from '../category/category.service';
import { TransactionType } from './enums';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { description, amount, category, type } = createTransactionDto;
    const lowCaseCategory = category.toLowerCase();
    const currentCategory = await this.categoryService.findOneByCategoryName(
      lowCaseCategory,
    );

    if (['income', 'outcome'].indexOf(type) === -1)
      throw new BadRequestException('Tipo de transação inválida!');

    const newTransaction = this.transactionRepository.create({
      description,
      amount,
      category: currentCategory,
      type,
    });

    await this.transactionRepository.save(newTransaction);

    await this.categoryService.countAndUpdateQuantity(currentCategory.id);

    return {
      message: 'Transação cadastrada com sucesso!',
      data: {
        ...newTransaction,
        category: currentCategory.name,
      },
    };
  }

  async findAll({
    limit,
    page,
    gte,
    lte,
    amount,
    category,
    description,
    type,
  }: SearchTransactionDto) {
    const params = {
      gte,
      lte,
      description,
      amount,
      category,
      type,
    };

    const wheres = Object.keys(params).reduce((acc, curr) => {
      if (params[curr]) {
        if (curr === 'gte' || curr === 'lte') {
          if (params['lte'] && params['gte']) {
            return {
              ...acc,
              amount: Between(params['gte'], params['lte']),
            };
          }

          if (params['gte'] && !params['lte']) {
            return {
              ...acc,
              amount: MoreThanOrEqual(params['gte']),
            };
          }

          if (params['lte'] && !params['gte']) {
            return {
              ...acc,
              amount: LessThanOrEqual(params['lte']),
            };
          }
        }

        if (curr === 'category') {
          return {
            ...acc,
            category: { name: category.toLowerCase() },
          };
        }
        return {
          ...acc,
          [curr]: params[curr],
        };
      }
      return acc;
    }, {});

    const [transactions, transactionInPageTot] =
      await this.transactionRepository.findAndCount({
        where: wheres,
        relations: ['category'],
        skip: (page - 1) * limit,
        take: limit,
      });

    const transactionTot = await this.transactionRepository.count();

    const totalPages = Math.ceil(transactionInPageTot / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      size: transactions.length,
      page,
      totalInPage: transactionInPageTot,
      total: transactionTot,
      nextPage,
      prevPage,
      totalPages,
      limit,
      data: transactions.map((transaction) => ({
        ...transaction,
        category: transaction.category.name,
      })),
    };
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!transaction)
      throw new BadRequestException(`A transação [${id}] não existe!`);

    return {
      data: {
        ...transaction,
        category: transaction.category.name,
      },
    };
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const currentTransaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!currentTransaction)
      throw new BadRequestException(`A transação [${id}] não existe!`);

    const { description, amount, category, type } = updateTransactionDto;

    const currentCategory =
      (await this.categoryService.findOneByCategoryName(category)) ||
      (await this.categoryService.create({ name: category })).data;

    await this.transactionRepository.update(id, {
      description,
      amount,
      category: currentCategory,
      type,
    });

    return {
      message: 'Transação atualizada com sucesso!',
      data: {
        ...currentTransaction,
        ...updateTransactionDto,
        category: currentCategory.name,
      },
    };
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction)
      throw new BadRequestException(`A transação [${id}] não existe!`);
    await this.transactionRepository.delete(id);
    return {
      message: 'Transação removida com sucesso!',
    };
  }
}
