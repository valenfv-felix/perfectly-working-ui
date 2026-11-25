import { useState } from 'react';
import { Filters } from './components/Filters';
import { Summary } from './components/Summary';
import { TransferDetailModal } from './components/TransferDetailModal';
import { TransferList } from './components/TransferList';
import { useTransfers } from './hooks/useTransfers';
import { TransferFilters } from './types';

const INITIAL_FILTERS: TransferFilters = {
  recipient: '',
  status: '',
  from: '',
  to: '',
  minAmount: '',
};

export function App() {
  const [filters, setFilters] = useState<TransferFilters>(INITIAL_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const transfers = useTransfers(filters);

  return (
    <div className="page">
      <div className="header">
        <div className="title">Transfers</div>
        <div className="subtitle">Your activity in the last 90 days</div>
      </div>

      <Filters filters={filters} onChange={setFilters} />

      {!transfers ? (
        <div className="loading">Loading…</div>
      ) : (
        <>
          <Summary transfers={transfers} />
          <TransferList transfers={transfers} onSelect={(id) => setSelectedId(id)} />
        </>
      )}

      {selectedId && (
        <TransferDetailModal transferId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
