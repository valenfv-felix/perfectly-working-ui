import { Transfer } from '../types';
import { TransferRow } from './TransferRow';

interface Props {
  transfers: Transfer[];
  onSelect: (id: string) => void;
}

export function TransferList({ transfers, onSelect }: Props) {
  const sorted = transfers.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="list">
      <div className="row row-head">
        <div className="cell cell-status" />
        <div className="cell cell-recipient">Recipient</div>
        <div className="cell cell-country">Country</div>
        <div className="cell cell-date">Date</div>
        <div className="cell cell-amount">Sent</div>
        <div className="cell cell-amount">Received</div>
      </div>
      {sorted.map((transfer, index) => (
        <TransferRow key={index} transfer={transfer} onSelect={onSelect} />
      ))}
    </div>
  );
}
