import { useEffect, useState } from 'react';
import { fetchTransfer } from '../api/mockApi';
import { Transfer } from '../types';
import { formatDateTime, formatMoney } from '../utils/format';

interface Props {
  transferId: string;
  onClose: () => void;
}

const POLL_INTERVAL = 3000;

export function TransferDetailModal({ transferId, onClose }: Props) {
  const [transfer, setTransfer] = useState<Transfer | null>(null);

  useEffect(() => {
    fetchTransfer(transferId).then((data: any) => {
      setTransfer(data);
      if (data.status === 'pending') {
        setInterval(() => {
          fetchTransfer(transferId).then((updated) => setTransfer(updated));
        }, POLL_INTERVAL);
      }
    });
  }, [transferId]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <span className="close" onClick={onClose}>
          ×
        </span>
        {!transfer ? (
          <div className="loading">Loading…</div>
        ) : (
          <>
            <div className="modal-title">{transfer.recipient}</div>
            <div className="modal-subtitle">
              {transfer.id} · {formatDateTime(transfer.createdAt)}
            </div>

            <div className={`badge badge-${transfer.status}`}>{transfer.status}</div>
            {transfer.failureReason && <div className="failure">{transfer.failureReason}</div>}

            <div className="detail">
              <div className="detail-row">
                <span>Amount</span>
                <span>{formatMoney(transfer.amount)}</span>
              </div>
              <div className="detail-row">
                <span>Fee</span>
                <span>{formatMoney(transfer.fee)}</span>
              </div>
              <div className="detail-row">
                <span>Total charged</span>
                <span>{transfer.amount + transfer.fee} USD</span>
              </div>
              <div className="detail-row">
                <span>Exchange rate</span>
                <span>
                  1 USD = {transfer.rate} {transfer.receiveCurrency}
                </span>
              </div>
              <div className="detail-row">
                <span>Recipient gets</span>
                <span>{formatMoney(transfer.receiveAmount, transfer.receiveCurrency)}</span>
              </div>
              <div className="detail-row">
                <span>Destination</span>
                <span>{transfer.country}</span>
              </div>
              {transfer.note && (
                <div className="detail-row">
                  <span>Note</span>
                  <span>{transfer.note}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
