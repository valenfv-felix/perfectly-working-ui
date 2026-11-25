import { Transfer } from '../types';

const COLUMNS = ['id', 'recipient', 'country', 'amount', 'fee', 'receiveAmount', 'receiveCurrency', 'status', 'createdAt', 'note'];

export function exportCsv(transfers: Transfer[]) {
  const header = COLUMNS.join(',');
  const rows = transfers.map((transfer) =>
    [
      transfer.id,
      transfer.recipient,
      transfer.country,
      transfer.amount.toFixed(2),
      transfer.fee.toFixed(2),
      transfer.receiveAmount.toFixed(2),
      transfer.receiveCurrency,
      transfer.status,
      transfer.createdAt,
      transfer.note,
    ].join(','),
  );

  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'transfers.csv';
  link.click();
}
