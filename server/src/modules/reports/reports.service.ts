import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionType } from '../transaction/enums';

@Injectable()
export class ReportsService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly transactionService: TransactionService,
  ) {}
  async getReports(): Promise<ReportsDTO> {
    const balance = await this.transactionService.calculateBalance();

    const dates = Array.from({ length: 10 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date;
    });

    const walletChart = await Promise.all(
      dates.map(async (date) => {
        const { data } = await this.transactionService.findByDate(date);

        const income = data.reduce((acc, curr) => {
          if (curr.type === 'income') {
            return acc + Number(curr.amount);
          }
          return acc;
        }, 0);

        const outcome = data.reduce((acc, curr) => {
          if (curr.type === 'outcome') {
            return acc + Number(curr.amount);
          }
          return acc;
        }, 0);

        const average = income - outcome;

        return {
          income,
          outcome,
          average,
        };
      }),
    );

    const walletIncomeInArray = walletChart.map((wallet) => wallet.income);
    const walletOutcomeInArray = walletChart.map((wallet) => wallet.outcome);
    const walletAverageInArray = walletChart.map((wallet) => wallet.average);

    const categories = await this.categoryService.findAll();

    const categoryNames = categories.data.map((category) => category.name);
    const categoryQuantities = categories.data.map((cat) => cat.quantity);

    const moreIncomeExpensiveByCategory = await Promise.all(
      categoryNames.map(async (category) => {
        const { data: dataIncome } =
          await this.transactionService.findMoreExpensiveByTypeAndCategory(
            {
              type: TransactionType.INCOME,
              category,
            },
            5,
          );

        const { data: dataOutcome } =
          await this.transactionService.findMoreExpensiveByTypeAndCategory(
            {
              type: TransactionType.OUTCOME,
              category,
            },
            5,
          );

        const maiorIncome = dataIncome.reduce((acc, curr) => {
          if (curr.amount > acc) {
            return curr.amount;
          }
          return acc;
        }, 0);

        const maiorOutcome = dataOutcome.reduce((acc, curr) => {
          if (curr.amount > acc) {
            return curr.amount;
          }
          return acc;
        }, 0);

        return {
          income: maiorIncome,
          outcome: maiorOutcome,
        };
      }),
    );

    return {
      message: 'Relatórios gerados com sucesso!',
      data: {
        balance,
        walletChart: {
          label: dates.map((date) =>
            new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            }).format(date),
          ),
          data: [
            walletIncomeInArray,
            walletOutcomeInArray,
            walletAverageInArray,
          ],
        },
        totalTransactionsByCategoryChart: {
          label: categoryNames,
          data: categoryQuantities,
          options: {
            colors: categories.data.map((category) => category.color),
          },
        },
        mostHighValuesInCategoryChart: {
          label: categoryNames,
          data: moreIncomeExpensiveByCategory,
        },
      },
    };
  }
  // funções auxiliares para gerar relatórios
}
