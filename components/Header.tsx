import React from 'react';

interface HeaderProps {
    onMenuClick: () => void;
    onCartClick: () => void;
    cartItemCount: number;
    establishmentName: string;
    establishmentLogoUrl: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onCartClick, cartItemCount, establishmentName, establishmentLogoUrl }) => {
    return (
        <header className="sticky top-0 z-20 flex items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-2 justify-between backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <img alt={`Logo do ${establishmentName}`} className="h-10 w-10 rounded-full object-cover" src={establishmentLogoUrl} loading="lazy" />
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">{establishmentName}</h1>
            </div>
            <div className="flex items-center gap-2">
                 <button className="relative flex items-center justify-center rounded-lg h-12 w-12 bg-transparent" onClick={onCartClick}>
                    <span className="material-symbols-outlined text-text-primary-light dark:text-text-primary-dark text-3xl">shopping_cart</span>
                    {cartItemCount > 0 && (
                        <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{cartItemCount}</span>
                    )}
                </button>
                <button className="flex items-center justify-center rounded-lg h-12 w-12 bg-transparent" onClick={onMenuClick}>
                    <span className="material-symbols-outlined text-text-primary-light dark:text-text-primary-dark text-3xl">menu</span>
                </button>
            </div>
        </header>
    );
};

export default React.memo(Header);
