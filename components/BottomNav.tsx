import React from 'react';

interface BottomNavProps {
    currentView: string;
    onNavigate: (view: 'home' | 'pedidos' | 'cart' | 'perfil') => void;
}

const navItems = [
    { label: 'Início', icon: 'home', view: 'home' },
    { label: 'Pedidos', icon: 'receipt_long', view: 'pedidos' },
    { label: 'Carrinho', icon: 'shopping_cart', view: 'cart' },
    { label: 'Perfil', icon: 'person', view: 'perfil' },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-10 grid grid-cols-4 border-t border-border-light bg-surface-light/80 dark:border-border-dark dark:bg-background-dark/80 backdrop-blur-sm">
            {navItems.map((item) => {
                const active = currentView === item.view;
                return (
                    <button
                        key={item.label}
                        onClick={() => onNavigate(item.view as 'home' | 'pedidos' | 'cart' | 'perfil')}
                        className={`flex flex-col items-center justify-center gap-1 p-3 focus:outline-none ${active ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                            {item.icon}
                        </span>
                        <span className={`text-xs ${active ? 'font-bold' : ''}`}>{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;