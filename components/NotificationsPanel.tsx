import React from 'react';

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'order' | 'system' | 'payment';
    status: 'unread' | 'read';
}

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    items: NotificationItem[];
    onMarkAllRead?: () => void;
}

const typeStyles: Record<string, { bg: string; text: string; icon: string }> = {
    order: { bg: 'bg-green-500/15', text: 'text-green-600 dark:text-green-400', icon: 'shopping_bag' },
    payment: { bg: 'bg-blue-500/15', text: 'text-blue-600 dark:text-blue-400', icon: 'credit_card' },
    system: { bg: 'bg-yellow-500/15', text: 'text-yellow-700 dark:text-yellow-400', icon: 'info' },
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose, items, onMarkAllRead }) => {
    const unreadCount = items.filter(i => i.status === 'unread').length;
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50`}>
            <div className={`absolute inset-0 z-0 bg-black/30 transition-opacity opacity-100`}></div>
            <div className={`absolute right-4 top-16 w-full max-w-md z-10 transition-transform translate-y-0`}>
                <div className="rounded-2xl bg-surface-light dark:bg-surface-dark shadow-xl border border-border-light dark:border-border-dark overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">notifications</span>
                            <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">Notificações</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{unreadCount} novas</span>
                            {onMarkAllRead && (
                                <button onClick={onMarkAllRead} className="text-xs font-semibold px-2 py-1 rounded bg-primary text-white">Marcar todas como lidas</button>
                            )}
                            <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>
                    <div className="max-h-96 overflow-auto">
                        {items.length === 0 && (
                            <div className="p-6 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">Sem notificações.</div>
                        )}
                        {items.map(item => {
                            const t = typeStyles[item.type];
                            return (
                                <div key={item.id} className={`flex items-start gap-3 px-4 py-3 ${item.status === 'unread' ? 'bg-primary/5' : ''} border-b border-border-light dark:border-border-dark`}>
                                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${t.bg}`}>
                                        <span className={`material-symbols-outlined ${t.text}`}>{t.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">{item.title}</p>
                                            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{item.date}</span>
                                        </div>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{item.description}</p>
                                    </div>
                                    {item.status === 'unread' && (
                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="px-4 py-3 flex items-center justify-end gap-2">
                        <button onClick={onClose} className="h-9 px-3 rounded-md bg-gray-200 dark:bg-gray-700 text-text-primary-light dark:text-text-primary-dark text-xs font-bold">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPanel;
