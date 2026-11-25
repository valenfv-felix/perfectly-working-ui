import { Transfer } from '../types';
import { formatDate, formatMoney } from '../utils/format';
import { highlight } from '../utils/highlight';

interface Props {
  transfer: Transfer;
  query: string;
  onSelect: (id: string) => void;
}

export function TransferRow({ transfer, query, onSelect }: Props) {
  return (
    <div className="row row-item" onClick={() => onSelect(transfer.id)}>
      <div className="cell cell-status">
        <span className={`dot dot-${transfer.status}`} />
      </div>
      <div className="cell cell-recipient">
        <div
          className="recipient"
          dangerouslySetInnerHTML={{ __html: highlight(transfer.recipient, query) }}
        />
        {transfer.note && (
          <div className="note" dangerouslySetInnerHTML={{ __html: highlight(transfer.note, query) }} />
        )}
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
