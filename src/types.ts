export type TransferStatus = 'completed' | 'pending' | 'failed';

export interface Transfer {
  id: string;
  recipient: string;
  country: string;
  amount: number;
  fee: number;
  rate: number;
  receiveAmount: number;
  receiveCurrency: string;
  status: TransferStatus;
  createdAt: string;
  note: string;
  failureReason?: string;
}

export interface TransferFilters {
  recipient: string;
  status: string;
  from: string;
  to: string;
  minAmount: string;
}

export interface TransferQuery {
  recipient?: string;
  status?: string;
  from?: string;
  to?: string;
  minAmount?: number;
}
