import React from 'react';
import { SideMenuItem } from '../types';

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigateToAdmin: () => void;
    items: SideMenuItem[];
    isPublicView: boolean;
    onNavigate: (view: 'home' | 'pedidos' | 'perfil' | 'enderecos' | 'paymentMethods') => void;
    establishmentName: string;
    establishmentLogoUrl: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigateToAdmin, items, isPublicView, onNavigate, establishmentName, establishmentLogoUrl }) => {
    return (
        <>
            <div
                className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <aside className={`fixed top-0 left-0 bottom-0 z-40 flex w-4/5 max-w-sm flex-col bg-background-light dark:bg-background-dark shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center gap-3 p-4 border-b border-border-light dark:border-border-dark">
                    <img alt={`Logo do ${establishmentName}`} className="h-10 w-10 rounded-full object-cover" src={establishmentLogoUrl} loading="lazy" />
                    <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">{establishmentName}</h1>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="flex flex-col gap-1">
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToAdmin(); }} className="flex items-center gap-4 rounded-lg p-3 text-base font-medium text-text-primary-light dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5">
                                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">admin_panel_settings</span>
                                Painel de Controle
                            </a>
                        </li>
                        {items.map((item) => (
                             <li key={item.id}>
                                <a 
                                    className="flex items-center gap-4 rounded-lg p-3 text-base font-medium text-text-primary-light dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5" 
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (item.view) {
                                            onNavigate(item.view);
                                        }
                                    }}
                                >
                                    <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">{item.icon}</span>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-border-light dark:border-border-dark">
                    <a className="flex items-center gap-4 rounded-lg p-3 text-base font-medium text-primary hover:bg-primary/10" href="#">
                        <span className="material-symbols-outlined">logout</span>
                        Sair
                    </a>
                </div>
            </aside>
        </>
    );
};

export default SideMenu;
