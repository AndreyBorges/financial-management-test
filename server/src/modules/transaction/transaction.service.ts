import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CategoryService } from '../category/category.service';
import {
  CreateTransactionDto,
  SearchTransactionDto,
  UpdateTransactionDto,
} from './dto';
import { Transaction } from './entities';

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

    if (!currentCategory) {
      throw new BadRequestException('Categoria não existe!');
    }

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
    const wheres:
      | FindOptionsWhere<Transaction>
      | FindOptionsWhere<Transaction>[] = {};

    if (gte && lte) {
      wheres.amount = Between(gte, lte);
    } else if (gte) {
      wheres.amount = MoreThanOrEqual(gte);
    } else if (lte) {
      wheres.amount = LessThanOrEqual(lte);
    }

    if (category) {
      wheres.category = { name: ILike(`%${category.toLowerCase()}%`) };
    }

    if (description) {
      wheres.description = ILike(`%${description}%`);
    }

    if (amount) {
      wheres.amount = amount;
    }

    if (type) {
      wheres.type = type;
    }

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
