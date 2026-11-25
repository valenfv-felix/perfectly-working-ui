import { TransferFilters } from '../types';

interface Props {
  filters: TransferFilters;
  onChange: (filters: TransferFilters) => void;
}

export function Filters({ filters, onChange }: Props) {
  const update = (key: keyof TransferFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="filters">
      <input
        className="input input-grow"
        type="text"
        placeholder="Search recipient"
        value={filters.recipient}
        onChange={(event) => update('recipient', event.target.value)}
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
