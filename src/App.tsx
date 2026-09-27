import { useState, useEffect } from 'react';
import {
  Utensils,
  Instagram,
  MessageCircle,
  MessageSquareReply,
  Tag,
  ChefHat,
  Bookmark,
  Info,
  X,
} from 'lucide-react';
import GeneratorPanel from '@/components/GeneratorPanel';
import BottomNav, { type TabId } from '@/components/BottomNav';
import HistoryModal from '@/components/HistoryModal';
import {
  generateMenuDescription,
  generateInstagramCaption,
  generateWhatsAppMessage,
  generateComplaintReply,
  generateDailySpecial,
  type GeneratorFn,
} from '@/lib/generators';
import { loadHistory, addToHistory, type SavedItem } from '@/lib/history';

const panelConfig: Record<TabId, {
  icon: React.ReactNode;
  label: string;
  description: string;
  placeholder: string;
  examples: string[];
  generate: GeneratorFn;
}> = {
  menu: {
    icon: <Utensils className="h-6 w-6" />,
    label: 'Menu Description',
    description: 'Create mouth-watering descriptions for your dishes.',
    placeholder: 'e.g. Grilled Salmon, lemon butter sauce, asparagus, garlic',
    examples: [
      'Margherita Pizza, fresh basil, mozzarella, tomato sauce',
      'Beef Burger, cheddar, caramelized onions, brioche bun',
      'Caesar Salad, romaine, parmesan, croutons, anchovy dressing',
    ],
    generate: generateMenuDescription,
  },
  instagram: {
    icon: <Instagram className="h-6 w-6" />,
    label: 'Instagram Caption',
    description: 'Generate catchy captions with hashtags for your posts.',
    placeholder: 'e.g. New truffle pasta on the menu this week',
    examples: [
      'Freshly baked croissants every morning',
      'Weekend brunch with bottomless mimosas',
      'Our new summer cocktail menu is here',
    ],
    generate: generateInstagramCaption,
  },
  whatsapp: {
    icon: <MessageCircle className="h-6 w-6" />,
    label: 'WhatsApp Message',
    description: 'Write promotional messages to send your customers.',
    placeholder: 'e.g. 20% off all pizzas every Friday this month',
    examples: [
      'Buy one get one free on all coffees today',
      'Free dessert with any main course this weekend',
      'Happy hour: 50% off drinks from 5-7 PM',
    ],
    generate: generateWhatsAppMessage,
  },
  complaint: {
    icon: <MessageSquareReply className="h-6 w-6" />,
    label: 'Complaint Reply',
    description: 'Respond professionally to customer complaints.',
    placeholder: 'e.g. Customer found the food was cold and service was slow',
    examples: [
      'Food was delivered late and arrived cold',
      'Waiter was rude and the table was not clean',
      'Order was incorrect — received chicken instead of fish',
    ],
    generate: generateComplaintReply,
  },
  special: {
    icon: <Tag className="h-6 w-6" />,
    label: 'Daily Special',
    description: 'Create eye-catching daily specials and offers.',
    placeholder: 'e.g. Seafood paella with saffron rice, served with a glass of white wine',
    examples: [
      'Grilled ribeye steak with truffle fries and a glass of red wine',
      'Lobster bisque with crusty bread and a side salad',
      'Vegan Buddha bowl with quinoa, roasted vegetables, and tahini',
    ],
    generate: generateDailySpecial,
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('menu');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [history, setHistory] = useState<SavedItem[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function handleSave(item: SavedItem) {
    const updated = addToHistory(item);
    setHistory(updated);
  }

  const config = panelConfig[activeTab];
  const savedCount = history.length;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shadow-sm">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">Restaurant AI Assistant</h1>
              <p className="text-[11px] text-stone-500">Content Creator</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInfoOpen(true)}
              className="flex items-center justify-center rounded-lg bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 transition"
            >
              <Info className="h-4 w-4" />
            </button>
            <button
              onClick={() => setHistoryOpen(true)}
              className="relative flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2 text-stone-600 hover:bg-stone-200 transition"
            >
              <Bookmark className="h-4 w-4" />
              {savedCount > 0 && (
                <span className="text-xs font-bold text-amber-700">{savedCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-md px-5 pt-5 pb-24">
        {/* Welcome card — only on first visit (menu tab, no history) */}
        {activeTab === 'menu' && savedCount === 0 && (
          <div className="mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 text-white animate-[fadeIn_0.4s_ease]">
            <h2 className="text-base font-bold mb-1">Welcome!</h2>
            <p className="text-sm leading-relaxed text-amber-50">
              Pick a tool below, describe what you need, and tap Generate to get
              ready-to-use content for your restaurant or cafe.
            </p>
          </div>
        )}

        <GeneratorPanel
          key={activeTab}
          tabId={activeTab}
          icon={config.icon}
          label={config.label}
          description={config.description}
          placeholder={config.placeholder}
          examples={config.examples}
          generate={config.generate}
          onSave={handleSave}
        />
      </main>

      {/* Bottom navigation */}
      <BottomNav active={activeTab} onChange={setActiveTab} />

      {/* History modal */}
      <HistoryModal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        items={history}
        onUpdate={setHistory}
      />

      {/* Info modal */}
      {infoOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 animate-[fadeIn_0.2s_ease]"
            onClick={() => setInfoOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-hidden rounded-t-3xl bg-white animate-[slideUp_0.3s_ease]">
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1.5 w-10 rounded-full bg-stone-300" />
            </div>
            <div className="max-h-[calc(85vh-2rem)] overflow-y-auto px-5 pb-8">
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-base font-bold text-stone-900">About This App</h3>
                <button
                  onClick={() => setInfoOpen(false)}
                  className="flex items-center justify-center rounded-lg bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-stone-600">
                <p>
                  <strong className="text-stone-900">Restaurant AI Assistant</strong> helps
                  restaurant and cafe owners create professional marketing content in seconds.
                </p>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-stone-800">Five tools included:</p>
                  <ul className="flex flex-col gap-1.5 pl-1">
                    <li className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-amber-600" /> Menu descriptions
                    </li>
                    <li className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-amber-600" /> Instagram captions
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-amber-600" /> WhatsApp promotions
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageSquareReply className="h-4 w-4 text-amber-600" /> Complaint replies
                    </li>
                    <li className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-amber-600" /> Daily specials
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
                  <strong>How it works:</strong> This prototype uses a built-in content
                  template system — not a live AI model — so everything works instantly
                  with no internet connection or API key needed. Each result is uniquely
                  assembled from your input and selected tone.
                </div>
                <div className="rounded-xl bg-stone-100 p-3 text-xs text-stone-600">
                  <strong className="text-stone-800">Tips for best results:</strong>
                  <ul className="mt-1 flex flex-col gap-1">
                    <li>• Include dish names and key ingredients, separated by commas</li>
                    <li>• Try different tones to match your brand voice</li>
                    <li>• Tap Save to keep content you want to reuse later</li>
                    <li>• Use Retry to get a new variation instantly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
