import React from 'react';
import { Category } from '../types';

const CategoryPill: React.FC<{ category: Category }> = ({ category }) => {
    const categoryStyles: { [key: string]: { bg: string; text: string } } = {
        'Carnes': { bg: 'bg-red-500/20 dark:bg-red-500/30', text: 'text-red-600 dark:text-red-400' },
        'Bebidas': { bg: 'bg-blue-500/20 dark:bg-blue-500/30', text: 'text-blue-600 dark:text-blue-400' },
        'Saladas': { bg: 'bg-green-500/20 dark:bg-green-500/30', text: 'text-green-600 dark:text-green-400' },
        'Promo': { bg: 'bg-yellow-500/20 dark:bg-yellow-500/30', text: 'text-yellow-600 dark:text-yellow-400' },
    };

    const style = categoryStyles[category.name] || { bg: 'bg-surface-light dark:bg-surface-dark', text: 'text-primary' };
    
    return (
        <div className="flex flex-col items-center gap-2">
            <div className={`flex h-16 w-16 items-center justify-center rounded-xl shadow-sm ${style.bg}`}>
                <span className={`material-symbols-outlined text-3xl ${style.text}`}>{category.icon}</span>
            </div>
            <p className="text-center text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{category.name}</p>
        </div>
    );
};

const MemoCategoryPill = React.memo(CategoryPill);


interface CategoriesProps {
    categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
    return (
        <section className="pb-8">
            <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-4">Categorias</h2>
            <div className="grid grid-cols-4 gap-4 px-4">
                {categories.map((category) => (
                    <MemoCategoryPill key={category.id} category={category} />
                ))}
            </div>
        </section>
    );
};

export default React.memo(Categories);
