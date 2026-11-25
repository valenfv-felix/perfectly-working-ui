import { Transfer, TransferQuery } from '../types';
import { generateTransfers } from './data';

const MIN_LATENCY = 200;
const MAX_LATENCY = 1400;
const FAILURE_RATE = 0.1;
const RETRY_FAILURE_RATE = 0.3;

const db: Transfer[] = generateTransfers(2000);

function simulate<T>(handler: () => T, failureRate = FAILURE_RATE): Promise<T> {
  const latency = MIN_LATENCY + Math.random() * (MAX_LATENCY - MIN_LATENCY);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error('Network error'));
        return;
      }
      try {
        resolve(handler());
      } catch (error) {
        reject(error);
      }
    }, latency);
  });
}

function findOrThrow(id: string): Transfer {
  const transfer = db.find((item) => item.id === id);
  if (!transfer) {
    throw new Error(`Transfer ${id} not found`);
  }
  return transfer;
}

export function fetchTransfers(query: TransferQuery = {}): Promise<Transfer[]> {
  return simulate(() => {
    const recipient = query.recipient?.trim().toLowerCase();
    return db
      .filter((item) => {
        if (recipient && !item.recipient.toLowerCase().includes(recipient)) return false;
        if (query.status && item.status !== query.status) return false;
        if (query.from && item.createdAt < query.from) return false;
        if (query.to && item.createdAt > query.to) return false;
        if (query.minAmount !== undefined && item.amount < query.minAmount) return false;
        return true;
      })
      .map((item) => ({ ...item }));
  });
}

export function fetchTransfer(id: string): Promise<Transfer> {
  return simulate(() => {
    const transfer = findOrThrow(id);
    if (transfer.status === 'pending' && Math.random() < 0.25) {
      transfer.status = 'completed';
    }
    return { ...transfer };
  });
}

export function retryTransfer(id: string): Promise<Transfer> {
  return simulate(() => {
    const transfer = findOrThrow(id);
    if (transfer.status !== 'failed') {
      throw new Error('Only failed transfers can be retried');
    }
    transfer.status = 'pending';
    transfer.failureReason = undefined;
    return { ...transfer };
  }, RETRY_FAILURE_RATE);
}
