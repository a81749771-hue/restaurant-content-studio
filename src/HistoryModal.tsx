import { useState } from 'react';
import { X, Trash2, Copy, Check } from 'lucide-react';
import { type SavedItem, clearHistory, removeFromHistory } from '@/lib/history';
import { toneLabels } from '@/lib/generators';

type Props = {
  open: boolean;
  onClose: () => void;
  items: SavedItem[];
  onUpdate: (items: SavedItem[]) => void;
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function HistoryModal({ open, onClose, items, onUpdate }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!open) return null;

  function handleCopy(item: SavedItem) {
    try {
      navigator.clipboard.writeText(item.output);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  function handleDelete(id: string) {
    const updated = removeFromHistory(id);
    onUpdate(updated);
  }

  function handleClearAll() {
    clearHistory();
    onUpdate([]);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-white animate-[slideUp_0.3s_ease]">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1.5 w-10 rounded-full bg-stone-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3">
          <div>
            <h3 className="text-base font-bold text-stone-900">Saved Content</h3>
            <p className="text-xs text-stone-500">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <div className="flex gap-2">
            {items.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-lg bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto px-5 pb-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                <Trash2 className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-stone-500">No saved content yet</p>
              <p className="text-xs text-stone-400 max-w-[200px]">
                Tap the Save button on any generated result to keep it here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                        {item.toolLabel}
                      </span>
                      <span className="text-[10px] font-medium text-stone-400">
                        {toneLabels[item.tone]} · {timeAgo(item.createdAt)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleCopy(item)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold text-stone-500 hover:bg-stone-200 transition"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-xs leading-relaxed text-stone-700">
                    {item.output}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
