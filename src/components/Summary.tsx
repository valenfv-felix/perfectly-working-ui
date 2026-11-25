import { Transfer } from '../types';
import { formatTotal } from '../utils/format';

interface Props {
  transfers: Transfer[];
}

export function Summary({ transfers }: Props) {
  const totalSent = transfers.reduce((sum, transfer) => sum + transfer.amount + transfer.fee, 0);
  const totalReceived = transfers.reduce((sum, transfer) => sum + transfer.receiveAmount, 0);
  const failed = transfers.filter((transfer) => transfer.status === 'failed').length;

  return (
    <div className="summary">
      <div className="card">
        <div className="card-label">Transfers</div>
        <div className="card-value">{transfers.length}</div>
      </div>
      <div className="card">
        <div className="card-label">Total sent</div>
        <div className="card-value">{formatTotal(totalSent)}</div>
      </div>
      <div className="card">
        <div className="card-label">Total received</div>
        <div className="card-value">{formatTotal(totalReceived)}</div>
      </div>
      <div className="card">
        <div className="card-label">Failed</div>
        <div className="card-value">{failed}</div>
      </div>
    </div>
  );
}
