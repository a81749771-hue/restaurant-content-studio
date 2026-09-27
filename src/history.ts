import type { TabId } from '@/components/BottomNav';
import type { Tone } from '@/lib/generators';

export type SavedItem = {
  id: string;
  tool: TabId;
  toolLabel: string;
  input: string;
  output: string;
  tone: Tone;
  createdAt: number;
};

const KEY = 'rai_history';
const MAX_ITEMS = 50;

export function loadHistory(): SavedItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(items: SavedItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch {
    // ignore
  }
}

export function addToHistory(item: SavedItem): SavedItem[] {
  const items = loadHistory();
  const updated = [item, ...items].slice(0, MAX_ITEMS);
  saveHistory(updated);
  return updated;
}

export function removeFromHistory(id: string): SavedItem[] {
  const items = loadHistory().filter((i) => i.id !== id);
  saveHistory(items);
  return items;
}

export function clearHistory(): void {
  saveHistory([]);
}
