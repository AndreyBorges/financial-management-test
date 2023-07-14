import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTransactionDto,
  SearchTransactionDto,
  UpdateTransactionDto,
} from './dto';
import { Category, Transaction } from './entities';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { description, amount, category, type } = createTransactionDto;
    const categoryAlreadyExist = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (['income', 'outcome'].indexOf(type) === -1)
      throw new BadRequestException('Tipo de transação inválida!');

    if (!categoryAlreadyExist) {
      const newCategory = this.categoryRepository.create({ name: category });
      await this.categoryRepository.save(newCategory);
    }

    const currentCategory = await this.categoryRepository.findOne({
      where: { name: category },
    });

    const newTransaction = this.transactionRepository.create({
      description,
      amount,
      category: currentCategory,
      type,
    });

    await this.transactionRepository.save(newTransaction);

    return {
      message: 'Transação cadastrada com sucesso!',
      data: {
        ...newTransaction,
        category: currentCategory.name,
      },
    };
  }

  async findAll({ limit, page }: SearchTransactionDto) {
    const [transactions, transactionTot] =
      await this.transactionRepository.findAndCount({
        relations: ['category'],
        skip: (page - 1) * limit,
        take: limit,
      });

    const totalPages = Math.ceil(transactionTot / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      size: transactions.length,
      page,
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

    const categoryAlreadyExist = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (!categoryAlreadyExist) {
      const newCategory = this.categoryRepository.create({ name: category });
      await this.categoryRepository.save(newCategory);
    }

    const currentCategory = await this.categoryRepository.findOne({
      where: { name: category },
    });

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
