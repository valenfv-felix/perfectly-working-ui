import { Transfer, TransferStatus } from '../types';

const FIRST_NAMES = [
  'María', 'José', 'Luis', 'Ana', 'Carlos', 'Rosa', 'Juan', 'Carmen', 'Miguel', 'Lucía',
  'Pedro', 'Elena', 'Jorge', 'Sofía', 'Diego', 'Valeria', 'Andrés', 'Gabriela', 'Fernando', 'Patricia',
];

const LAST_NAMES = [
  'García', 'Hernández', 'López', 'Martínez', 'Rodríguez', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores',
  'Gómez', 'Díaz', 'Morales', 'Castillo', 'Ortiz', 'Vargas', 'Mendoza', 'Rojas', 'Cruz', 'Reyes',
];

const CORRIDORS = [
  { country: 'Mexico', currency: 'MXN', rate: 18.4375 },
  { country: 'Colombia', currency: 'COP', rate: 4112.35 },
  { country: 'Guatemala', currency: 'GTQ', rate: 7.7215 },
  { country: 'Honduras', currency: 'HNL', rate: 25.1162 },
  { country: 'Dominican Republic', currency: 'DOP', rate: 60.845 },
];

const NOTES = [
  'Rent',
  'For mom',
  'School fees',
  'Happy birthday!',
  'Rent, utilities',
  'Medicine & groceries',
  'Thanks <b>so</b> much!',
  'Monthly support',
  '=SUM of what I owe you :)',
  'Paid "in full"',
  '',
  '',
];

const FAILURE_REASONS = [
  'Recipient bank rejected the transfer',
  'Insufficient funds',
  'Recipient details could not be verified',
  'Daily limit exceeded',
];

const FEE_RATE = 0.029;
const DAY_MS = 24 * 60 * 60 * 1000;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(items: T[], random: () => number): T {
  return items[Math.floor(random() * items.length)];
}

function pickStatus(random: () => number): TransferStatus {
  const value = random();
  if (value < 0.78) return 'completed';
  if (value < 0.9) return 'pending';
  return 'failed';
}

export function generateTransfers(count: number): Transfer[] {
  const random = mulberry32(20240611);
  const now = Date.now();
  const transfers: Transfer[] = [];

  for (let i = 0; i < count; i++) {
    const corridor = pick(CORRIDORS, random);
    const amount = Math.round(random() * 149000 + 1000) / 100;
    const status = pickStatus(random);
    const createdAt = new Date(now - random() * 90 * DAY_MS).toISOString();

    transfers.push({
      id: `TRX-${String(100000 + i)}`,
      recipient: `${pick(FIRST_NAMES, random)} ${pick(LAST_NAMES, random)}`,
      country: corridor.country,
      amount,
      fee: amount * FEE_RATE,
      rate: corridor.rate,
      receiveAmount: amount * corridor.rate,
      receiveCurrency: corridor.currency,
      status,
      createdAt,
      note: pick(NOTES, random),
      failureReason: status === 'failed' ? pick(FAILURE_REASONS, random) : undefined,
    });
  }

  return transfers;
}
