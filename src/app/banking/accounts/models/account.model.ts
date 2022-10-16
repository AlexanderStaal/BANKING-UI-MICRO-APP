import { alphaNumeric, range } from "@rxweb/reactive-form-validators"

export class SubjectDetails {
  @range({ minimumNumber: 1, maximumNumber: 10000 })
  amount: number;
}

export class CreateAccountStatus {
  returnValue: string;
}

export class AccountData {
  accountNumber: number | null;
  accountName: string;
  balance: number | null;
}

export class Location {
  @alphaNumeric()
  accountName: string;
}
