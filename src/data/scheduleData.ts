import type { ProductionScheduleSlot } from '../types/portfolio';

// Helper pembuat string tanggal YYYY-MM-DD lokal
export function formatLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Menghasilkan daftar jadwal default kosong (data diisi secara mandiri melalui admin)
export function generateDefaultScheduleSlots(): ProductionScheduleSlot[] {
  return [];
}

export const DEFAULT_SCHEDULE_SLOTS: ProductionScheduleSlot[] = [];
