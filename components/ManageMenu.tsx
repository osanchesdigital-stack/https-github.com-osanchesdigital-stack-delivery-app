import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';

const initialMenuItems: MenuItem[] = [
    { id: '1', name: 'Espeto de Alcatra', price: '15,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFFq-MyFjDcfUEeEYc4qCrN0ybDLH1OdYeh9LbLSiKlSzeuBeqUJ7zplKUT1CrbVk5qJJQ8ii7VpZpJt00GjTDYSsDpJ4BzgPee3IARTWQtK2KQ0ygeX5MRk8xVxBabAU7l-WozXw8O0iFuPfsGVkk8oiyry3Stu0yNaEepidqzasH2KpqYck6u4m9g8C66_sCi7OlDo1kOCB_btgpMLQFzYlJD9XSWraLj5G8TUhSxNo6M8GaQA4EDpFWwkdU06mMhj7muHBlaEY', alt: 'Espeto de Alcatra', category: 'Espetos', available: true },
    { id: '2', name: 'Espeto de Coração', price: '12,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj6-cM8PHef31GICOsOdFHmofVlJBNctk5eIdnD5y7SEzU0mx2u6kVbyWhxVn7Dwxpfc9eZV28rrJ9VMLiYScF_MPvl4muBbxb_q8tFkwV-n6YQYdIZEO8xW5AUdmVRaY1L1OfNQfks4zPel-KSr23pUgeZGdafHJTmIB5r0GrKd_g2MZr_2s_wIUCodfNwtQ9NDrXXb2xdlXF3JkS1i-KSnHkYk8za1l6Hs-imZM4oVDNDutQAsR4_SA_H6ZevdUWaGf9mUOhu9w', alt: 'Espeto de Coração', category: 'Espetos', available: true },
    { id: '3', name: 'Espeto de Kafta', price: '14,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUe-MaCN8JnngDBNch1TcC9g0kTvVRFOl4ueL3Xqel3AIrrUFhsxbOxyHWBnjk_NR4gM3MgGEOZS4S7cc_GBYkFPbqVaLCEiw1ZkoMugAyQsUu_3FKqoTMIBYLSepDSqQWkaYDMjtYZTRWX0DAzH5HnZ28AOsUDzP_NrooCYvHwCwxG4d01peCTvXrhk5TOCZ7TWo-FgyrfCDvRun-uzXpVsY3V6hhb6jFwjVJTKki8ZcVZc4HkTNFQG4TAcrOUvnWcFOrwpTyN2w', alt: 'Espeto de Kafta', category: 'Espetos', available: false },
    { id: '4', name: 'Coca-Cola Lata', price: '6,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2exkb7ZpPj6Jj-L0tth9vdKTWyGOSgTTdMA2nHD13KejXBS1BxsnwuRLU_3LQbabjCKlMcuur4xcCgWqOxVX964NMDWGxd6y8QL9PHIJs7sW6yRCGB7XhAq1gcaY5ve57VCIjJqFUG0m7opuIF6BdFlcalreITui7-lHzBjvykVZUtz979HYJi0oE1f99Pm9Yv_nizg-sR9IPzb970zbE2tZuBdj9ce8CX_QpWs41SPN7rO9lNriKLpGZlQ4Btp-3MnkzgMnQirc', alt: 'Coca-Cola Lata', category: 'Bebidas', available: true },
    { id: '5', name: 'Suco de Laranja', price: '8,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZjiyroahp5mEljZWXpTKpmk8BTytdId95613eMDxIpqjnoPqAj0ZayioL4vGPgCQWd8rismjljajH0yM9JDEvrtYgZFdZ353JVS7zt_FhPzTckchtaFcThyYkp-uWd-UOL55RZiBlR0Akvb8TzAv2MKo_7xVqOYR9EYO4-eV3viFzozoVj6hjGyFJH8zjK06GN7ypb2ehpu959HD8RcvwtdmtCE6q8RxzpkKC7dq0EHHMnssZUT54mGW16VQQxhv0yYALtpcm9Y', alt: 'Suco de Laranja', category: 'Bebidas', available: true },
    { id: '6', name: 'Porção de Batata Frita', price: '20,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXorDVO0Lsz9K2yRcYVhV8kt16PNfhlq_Saqd6NTN8W9KcDdM0rSvHCy0sRo3iI4azk6aqwJtQr3oIk4HZtX_1PynR4MgqR4UHNd9WDv1SVLDDFh68a-ZYx6hzaEBJcdDM9RcMzls9A8za-dZeeKHiM06pIKokOy3TD1c6ArD17tFhRX8VOxaLHbIFjSZOmRbk_4GwcKu8ts5kr09ww1EE7KBVKVh6hvBbOYaTkIptUePuCi6DwUba-HqluxxXVemEvh4XsO_t3fQ', alt: 'Porção de Batata Frita', category: 'Acompanhamentos', available: true },
];

const categories = ['Todos', 'Espetos', 'Bebidas', 'Acompanhamentos', 'Sobremesas'];

interface ManageMenuProps {
    onBack: () => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full p-0.5 transition-colors ${checked ? 'bg-green-500 justify-end' : 'bg-primary/20 dark:bg-white/10 justify-start'}`}>
        <div className="h-full w-[27px] rounded-full bg-white transition-transform" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px' }}></div>
        <input checked={checked} onChange={onChange} className="invisible absolute" type="checkbox" />
    </label>
);

const MenuItemRow: React.FC<{ item: MenuItem; onToggle: (id: string) => void }> = ({ item, onToggle }) => (
     <div className={`flex items-center gap-4 bg-transparent px-4 py-3 justify-between ${!item.available ? 'opacity-50' : ''}`}>
        <div className="flex items-center gap-4 overflow-hidden">
            <img className="object-cover rounded-lg size-14 shrink-0" alt={item.alt} src={item.image} />
            <div className="flex flex-col justify-center">
                <p className="text-[#1c120d] dark:text-white text-base font-medium leading-normal line-clamp-1">{item.name}</p>
                <p className="text-primary text-sm font-semibold leading-normal line-clamp-2">R$ {item.price}</p>
            </div>
        </div>
        <div className="shrink-0">
            <ToggleSwitch checked={item.available} onChange={() => onToggle(item.id)} />
        </div>
    </div>
);

const ManageMenu: React.FC<ManageMenuProps> = ({ onBack }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
    const [activeFilter, setActiveFilter] = useState('Todos');

    const handleToggleAvailability = (id: string) => {
        setMenuItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, available: !item.available } : item
            )
        );
    };

    const filteredItems = useMemo(() => {
        if (activeFilter === 'Todos') return menuItems;
        return menuItems.filter(item => item.category === activeFilter);
    }, [menuItems, activeFilter]);

    const groupedItems = useMemo(() => {
        return filteredItems.reduce((acc, item) => {
            const category = item.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {} as Record<string, MenuItem[]>);
    }, [filteredItems]);


    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            {/* Top App Bar */}
            <div className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-black/10 dark:border-white/10">
                <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-[#1c120d] dark:text-white">arrow_back</span>
                </button>
                <h2 className="text-[#1c120d] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Gerenciar Cardápio</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#1c120d] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </div>
            </div>
            
            {/* Chips Filter */}
            <div className="sticky top-[72px] z-10 bg-background-light dark:bg-background-dark py-3">
                <div className="flex gap-3 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {categories.map(category => (
                        <div key={category} onClick={() => setActiveFilter(category)} className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 cursor-pointer ${activeFilter === category ? 'bg-primary' : 'bg-primary/20 dark:bg-white/10'}`}>
                            <p className={`text-sm font-medium leading-normal ${activeFilter === category ? 'text-white' : 'text-[#1c120d] dark:text-white'}`}>{category}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Accordions with List Items */}
            <div className="flex flex-col p-4 gap-4 pb-24">
                {Object.entries(groupedItems).map(([category, items]) => (
                    <details key={category} className="flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark border border-black/10 dark:border-white/10 group" open>
                        <summary className="flex cursor-pointer items-center justify-between gap-6 p-4">
                            {/* FIX: Cast `items` to `MenuItem[]` to resolve TypeScript error where it was inferred as `unknown`. */}
                            <p className="text-[#1c120d] dark:text-white text-base font-bold leading-normal">{category} ({(items as MenuItem[]).length})</p>
                            <span className="material-symbols-outlined text-[#1c120d] dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
                        </summary>
                        <div className="flex flex-col divide-y divide-black/5 dark:divide-white/5">
                            {/* FIX: Cast `items` to `MenuItem[]` to resolve TypeScript error where it was inferred as `unknown`. */}
                            {(items as MenuItem[]).map(item => (
                                <MenuItemRow key={item.id} item={item} onToggle={handleToggleAvailability} />
                            ))}
                        </div>
                    </details>
                ))}
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-20">
                <button className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform active:scale-95">
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            </div>
        </div>
    );
};

export default ManageMenu;