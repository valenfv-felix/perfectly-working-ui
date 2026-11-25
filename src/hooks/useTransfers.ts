import { useEffect, useState } from 'react';
import { fetchTransfers } from '../api/mockApi';
import { Transfer, TransferFilters, TransferQuery } from '../types';

function buildQuery(filters: TransferFilters): TransferQuery {
  const query: TransferQuery = {};
  if (filters.recipient) query.recipient = filters.recipient;
  if (filters.status) query.status = filters.status;
  if (filters.from) query.from = new Date(filters.from).toISOString();
  if (filters.to) query.to = new Date(filters.to).toISOString();
  if (filters.minAmount) query.minAmount = parseFloat(filters.minAmount);
  return query;
}

export function useTransfers(filters: TransferFilters) {
  const [transfers, setTransfers] = useState<Transfer[] | null>(null);

  useEffect(() => {
    fetchTransfers(buildQuery(filters))
      .then((data) => setTransfers(data))
      .catch((error) => console.error(error));
  }, [filters.recipient, filters.status, filters.from, filters.to, filters.minAmount]);

  return transfers;
}
