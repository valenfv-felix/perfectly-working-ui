import { Transfer } from '../types';
import { formatDate, formatMoney } from '../utils/format';

interface Props {
  transfer: Transfer;
  onSelect: (id: string) => void;
}

export function TransferRow({ transfer, onSelect }: Props) {
  return (
    <div className="row row-item" onClick={() => onSelect(transfer.id)}>
      <div className="cell cell-status">
        <span className={`dot dot-${transfer.status}`} />
      </div>
      <div className="cell cell-recipient">
        <div className="recipient">{transfer.recipient}</div>
        {transfer.note && <div className="note">{transfer.note}</div>}
      </div>
      <div className="cell cell-country">{transfer.country}</div>
      <div className="cell cell-date">{formatDate(transfer.createdAt)}</div>
      <div className="cell cell-amount">{formatMoney(transfer.amount)}</div>
      <div className="cell cell-amount">
        {formatMoney(transfer.receiveAmount, transfer.receiveCurrency)}
      </div>
    </div>
  );
}
