import { Utensils, Instagram, MessageCircle, MessageSquareReply, Tag } from 'lucide-react';

export type TabId = 'menu' | 'instagram' | 'whatsapp' | 'complaint' | 'special';

export const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'menu', label: 'Menu', icon: <Utensils className="h-5 w-5" /> },
  { id: 'instagram', label: 'Instagram', icon: <Instagram className="h-5 w-5" /> },
  { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="h-5 w-5" /> },
  { id: 'complaint', label: 'Reply', icon: <MessageSquareReply className="h-5 w-5" /> },
  { id: 'special', label: 'Special', icon: <Tag className="h-5 w-5" /> },
];

type Props = {
  active: TabId;
  onChange: (id: TabId) => void;
};

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 transition"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-100 text-amber-700 scale-110'
                    : 'text-stone-400'
                }`}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[10px] font-semibold transition ${
                  isActive ? 'text-amber-700' : 'text-stone-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
