import React from 'react';
import { PopularItem } from '../types';

interface MenuItemCardProps {
    item: PopularItem;
    onSelect: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect }) => (
    <div className="flex items-center gap-4 rounded-xl bg-surface-light dark:bg-surface-dark p-3 shadow-sm">
        <div className="flex flex-1 items-center gap-4 cursor-pointer" onClick={onSelect} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect()}>
             <img className="h-24 w-24 shrink-0 rounded-lg object-cover" alt={item.alt} src={item.image} loading="lazy" />
            <div className="flex-1">
                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark">{item.name}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">{item.description}</p>
                <p className="mt-2 font-bold text-text-primary-light dark:text-text-primary-dark">R$ {item.price.replace('.',',')}</p>
            </div>
        </div>
        <button onClick={onSelect} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform duration-200 hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined">add</span>
        </button>
    </div>
);

const MemoMenuItemCard = React.memo(MenuItemCard);

interface PopularItemsProps {
    items: PopularItem[];
    onSelectItem: (item: PopularItem) => void;
}

const PopularItems: React.FC<PopularItemsProps> = ({ items, onSelectItem }) => {
    return (
        <section>
            <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-4">Mais Populares</h2>
            <div className="flex flex-col gap-4 px-4">
                {items.map((item) => (
                    <MemoMenuItemCard key={item.id} item={item} onSelect={() => onSelectItem(item)}/>
                ))}
            </div>
        </section>
    );
};

export default React.memo(PopularItems);
