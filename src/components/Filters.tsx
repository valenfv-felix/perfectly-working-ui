import { useState } from 'react';
import { TransferFilters } from '../types';
import { debounce } from '../utils/debounce';

interface Props {
  filters: TransferFilters;
  onChange: (filters: TransferFilters) => void;
}

export function Filters({ filters, onChange }: Props) {
  const [recipient, setRecipient] = useState(filters.recipient);

  const update = (key: keyof TransferFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  // Debounce the search so we don't hit the API on every keystroke
  const debouncedSearch = debounce((value: string) => {
    update('recipient', value);
  }, 300);

  const handleSearch = (value: string) => {
    setRecipient(value);
    debouncedSearch(value);
  };

  return (
    <div className="filters">
      <input
        className="input input-grow"
        type="text"
        placeholder="Search recipient"
        value={recipient}
        onChange={(event) => handleSearch(event.target.value)}
      />
      <select
        className="input"
        value={filters.status}
        onChange={(event) => update('status', event.target.value)}
      >
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
      <input
        className="input"
        type="date"
        value={filters.from}
        onChange={(event) => update('from', event.target.value)}
      />
      <input
        className="input"
        type="date"
        value={filters.to}
        onChange={(event) => update('to', event.target.value)}
      />
      <input
        className="input input-small"
        type="number"
        placeholder="Min amount"
        value={filters.minAmount}
        onChange={(event) => update('minAmount', event.target.value)}
      />
    </div>
  );
}
