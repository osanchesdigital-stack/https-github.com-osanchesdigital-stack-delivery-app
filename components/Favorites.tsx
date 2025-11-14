import React from 'react';
import { PopularItem } from '../types';

interface FavoriteItemCardProps {
    item: PopularItem;
    onSelect: () => void;
}

const FavoriteItemCard: React.FC<FavoriteItemCardProps> = ({ item, onSelect }) => (
    <div className="flex-shrink-0 w-40 rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm overflow-hidden group cursor-pointer" onClick={onSelect} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect()}>
        <div className="relative">
            <img className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-110" alt={item.alt} src={item.image} loading="lazy" />
            <div className="absolute bottom-0 right-0 mb-2 mr-2">
                 <button aria-label={`Adicionar ${item.name}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform duration-200 hover:scale-110 active:scale-95">
                    <span className="material-symbols-outlined text-lg">add</span>
                </button>
            </div>
        </div>
        <div className="p-3">
            <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark text-sm truncate">{item.name}</h3>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 h-8">{item.description}</p>
            <p className="mt-2 font-bold text-text-primary-light dark:text-text-primary-dark text-sm">R$ {item.price.replace('.',',')}</p>
        </div>
    </div>
);

const MemoFavoriteItemCard = React.memo(FavoriteItemCard);

interface FavoritesProps {
    items: PopularItem[];
    onSelectItem: (item: PopularItem) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ items, onSelectItem }) => {
    return (
        <section>
            <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-4">Queridinhos</h2>
            <div className="flex gap-4 px-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                 {items.map((item) => (
                    <MemoFavoriteItemCard key={item.id} item={item} onSelect={() => onSelectItem(item)} />
                ))}
            </div>
        </section>
    );
};

export default React.memo(Favorites);
