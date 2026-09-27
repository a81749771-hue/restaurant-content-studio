import { useState } from 'react';
import { Sparkles, Copy, Check, RotateCw, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { type GeneratorFn, type GenerateResult, type Tone, toneLabels } from '@/lib/generators';
import { type SavedItem } from '@/lib/history';
import { type TabId } from '@/components/BottomNav';

type Props = {
  tabId: TabId;
  icon: React.ReactNode;
  label: string;
  description: string;
  placeholder: string;
  examples: string[];
  generate: GeneratorFn;
  onSave: (item: SavedItem) => void;
};

export default function GeneratorPanel({
  tabId,
  icon,
  label,
  description,
  placeholder,
  examples,
  generate,
  onSave,
}: Props) {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState<Tone>('casual');
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  function runGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    setHasGenerated(true);
    setCopied(false);
    setSaved(false);
    setTimeout(() => {
      setResult(generate(input, tone));
      setLoading(false);
    }, 500);
  }

  function handleCopy() {
    if (!result?.body) return;
    try {
      navigator.clipboard.writeText(result.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  function handleSave() {
    if (!result?.body) return;
    const item: SavedItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      tool: tabId,
      toolLabel: label,
      input,
      output: result.body,
      tone,
      createdAt: Date.now(),
    };
    onSave(item);
    setSaved(true);
  }

  function useExample(ex: string) {
    setInput(ex);
  }

  const tones: Tone[] = ['professional', 'casual', 'playful'];

  return (
    <div className="flex flex-col gap-5 pb-8">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-900">{label}</h2>
          <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-stone-700">
          Describe what you need
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none transition"
        />

        {/* Examples */}
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => useExample(ex)}
              className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-amber-100 hover:text-amber-800 transition"
            >
              {ex.length > 42 ? ex.slice(0, 42) + '…' : ex}
            </button>
          ))}
        </div>

        {/* Tone selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-700">Tone</label>
          <div className="flex gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  tone === t
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {toneLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={runGenerate}
          disabled={!input.trim() || loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40 transition active:scale-[0.98]"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate
            </>
          )}
        </button>
      </div>

      {/* Result */}
      {hasGenerated && (
        <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 animate-[fadeIn_0.3s_ease]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-stone-400">
              {result?.title}
            </span>
            <div className="flex gap-2">
              <button
                onClick={runGenerate}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition disabled:opacity-40"
              >
                <RotateCw className="h-3.5 w-3.5" />
                Retry
              </button>
              <button
                onClick={handleSave}
                disabled={!result?.body || loading}
                className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition disabled:opacity-40"
              >
                {saved ? (
                  <>
                    <BookmarkCheck className="h-3.5 w-3.5 text-green-600" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-3.5 w-3.5" />
                    Save
                  </>
                )}
              </button>
              <button
                onClick={handleCopy}
                disabled={!result?.body || loading}
                className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition disabled:opacity-40"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center gap-2 py-6 text-sm text-stone-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Crafting your content…
            </div>
          ) : result?.body ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-800">
              {result.body}
            </p>
          ) : (
            <p className="text-sm text-stone-400 italic">
              Please enter some details above, then tap Generate.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
