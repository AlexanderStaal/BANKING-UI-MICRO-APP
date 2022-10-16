export class TransactionsDataResult {
  data: TransactionsData[];
}

export class TransferFundsStatus {
  transferFundsStatus: string;
}

export class TransferFundsData {
  accountFromNumber: number | null;
  accountToNumber: number | null;
  amount: number | null;
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