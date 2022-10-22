export class TransactionsDataResult {
  data: TransactionsData[];
}

export class TransferFundsStatus {
  transferFundsStatus: string;
}

export class TransferFundsData {
  fromAccountNumber: number | null;
  toAccountNumber: number | null;
  amount: string;
}

export class TransactionsData {
  transactionId: number | null;
  fromAccountNumber: string;
  toAccountNumber: string;
  transactionTime: Date;
  amountDebit: number | null;
  fromAccountBalance: number | null;
  toAccountBalance: number | null;
}

export class TransferSource {
  value: string;
  lable: string;
}