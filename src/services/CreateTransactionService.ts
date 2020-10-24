import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!title) {
      throw Error('Invalid Title');
    }

    if (!value) {
      throw Error(`Invalid Value`);
    }

    if (!type || (type !== 'income' && type !== 'outcome')) {
      throw Error(`Invalid Type.`);
    }

    if (
      type === `outcome` &&
      value > this.transactionsRepository.getBalance().total
    ) {
      throw Error(`Invalid Outcome value.`);
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
