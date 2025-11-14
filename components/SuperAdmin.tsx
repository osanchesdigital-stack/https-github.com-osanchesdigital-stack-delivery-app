import React, { useRef, useState } from 'react';
import DashboardPage from '@/components/super-admin/DashboardPage';
import FinancialReportsPage from '@/components/super-admin/FinancialReportsPage';
import EstablishmentsPage from '@/components/super-admin/EstablishmentsPage';
import SettingsPage from '@/components/super-admin/SettingsPage';
import PlansPage from '@/components/super-admin/PlansPage';
import NotificationsPanel from '@/components/NotificationsPanel';

interface SuperAdminProps {
    onBack: () => void;
}

const SuperAdmin: React.FC<SuperAdminProps> = ({ onBack }) => {
    const [activePage, setActivePage] = useState('dashboard');
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 'n1', title: 'Novo pedido recebido', description: 'Pedido #1024 do Burger Queen', date: '14 Nov, 10:12', type: 'order', status: 'unread' },
        { id: 'n2', title: 'Pagamento confirmado', description: 'Mensalidade do Pizzaria Delícia', date: '13 Nov, 18:45', type: 'payment', status: 'read' },
        { id: 'n3', title: 'Atualização de sistema', description: 'Melhorias de desempenho aplicadas', date: '12 Nov, 09:20', type: 'system', status: 'read' },
    ]);
    const lastCloseAt = useRef<number | null>(null);

    const pageConfig: { [key: string]: { title: string; component: React.ReactNode } } = {
        'dashboard': { title: 'Dashboard', component: <DashboardPage /> },
        'finance': { title: 'Relatórios Financeiros', component: <FinancialReportsPage /> },
        'establishments': { title: 'Estabelecimentos', component: <EstablishmentsPage /> },
        'plans': { title: 'Planos e Assinaturas', component: <PlansPage /> },
        'settings': { title: 'Configurações', component: <SettingsPage /> },
    };
    
    const activeTitle = pageConfig[activePage]?.title || 'Dashboard';

    return (
        <div className="super-admin-panel font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark">
            <style>
                {`
                    .material-symbols-outlined.fill {
                        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    }
                `}
            </style>
            <div className="flex min-h-screen">
                {/* SideNavBar */}
                <aside className="w-64 flex-shrink-0 bg-primary text-white flex flex-col p-4">
                    <div
                        className="flex items-center gap-3 px-3 py-2 mb-4 cursor-pointer"
                        onClick={onBack}
                        title="Voltar ao Painel de Controle"
                    >
                        <div className="bg-white/20 text-white flex items-center justify-center rounded-lg size-10">
                            <span className="material-symbols-outlined text-2xl">local_mall</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-base leading-normal">MeuDelivery</h1>
                            <p className="text-white/70 text-sm font-normal leading-normal">Admin Panel</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('dashboard'); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activePage === 'dashboard' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                            <span className={`material-symbols-outlined text-2xl ${activePage === 'dashboard' ? 'fill' : ''}`}>dashboard</span>
                            <p className={`${activePage === 'dashboard' ? 'font-semibold' : 'font-medium'} text-sm leading-normal`}>Dashboard</p>
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('establishments'); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activePage === 'establishments' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                            <span className={`material-symbols-outlined text-2xl ${activePage === 'establishments' ? 'fill' : ''}`}>storefront</span>
                            <p className={`${activePage === 'establishments' ? 'font-semibold' : 'font-medium'} text-sm leading-normal`}>Estabelecimentos</p>
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('plans'); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activePage === 'plans' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                            <span className={`material-symbols-outlined text-2xl ${activePage === 'plans' ? 'fill' : ''}`}>subscriptions</span>
                            <p className={`${activePage === 'plans' ? 'font-semibold' : 'font-medium'} text-sm leading-normal`}>Planos</p>
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('finance'); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activePage === 'finance' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                            <span className={`material-symbols-outlined text-2xl ${activePage === 'finance' ? 'fill' : ''}`}>account_balance_wallet</span>
                            <p className={`${activePage === 'finance' ? 'font-semibold' : 'font-medium'} text-sm leading-normal`}>Finanças</p>
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('settings'); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activePage === 'settings' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                            <span className={`material-symbols-outlined text-2xl ${activePage === 'settings' ? 'fill' : ''}`}>settings</span>
                            <p className={`${activePage === 'settings' ? 'font-semibold' : 'font-medium'} text-sm leading-normal`}>Configurações</p>
                        </a>
                    </nav>
                    <div className="mt-auto flex items-center gap-3 px-3 py-2">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User avatar image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvENUoDuGVCf2JF0ruWTjLXwLFbKUQH91Hc2GW-gJzCphN1hOFv4vsQ_VRn53Cq7Kl1rPPvBehhRsF03xjlzxSyNUmajbdVVJrP2new0gBLdLWn7VoFC9Am2DZjUI9VKMpNPLCJxmEyPnHhNe6pJWzWA-X6HDt9i_CnHk6gZT5oh7u9ZH7J_kSsrkjtGPdO2_ykQprN6NT8hfWHW6D082XYo-LRTADXa-A7ogAmSy7urO-JvIzE7sbTGcx5hQjn_BhxDEOl0KK8Rs")' }}></div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium leading-normal">Admin User</p>
                            <p className="text-white/70 text-xs font-normal leading-normal">admin@email.com</p>
                        </div>
                    </div>
                </aside>
                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {/* TopNavBar */}
                    <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 px-6 py-4 border-b border-border-light dark:border-border-dark backdrop-blur-sm">
                        <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-tight">{activeTitle}</h2>
                        <div className="flex flex-1 justify-end gap-6 items-center">
                            <label className="flex flex-col min-w-40 h-10 max-w-64">
                                <div className="flex w-full items-stretch rounded-full h-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus-within:ring-2 focus-within:ring-primary">
                                    <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-center pl-3">
                                        <span className="material-symbols-outlined text-2xl">search</span>
                                    </div>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 text-sm font-normal leading-normal" placeholder="Buscar..." />
                                </div>
                            </label>
                            <button
                                className="relative text-text-secondary-light dark:text-text-secondary-dark hover:text-primary"
                                onClick={(e) => {
                                    if (lastCloseAt.current && Date.now() - lastCloseAt.current < 250) {
                                        e.preventDefault();
                                        return;
                                    }
                                    setIsNotifOpen(true);
                                }}
                            >
                                <span className="material-symbols-outlined text-2xl">notifications</span>
                                {notifications.some(n => n.status === 'unread') && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                                        {notifications.filter(n => n.status === 'unread').length}
                                    </span>
                                )}
                            </button>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/30" data-alt="User avatar image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_sqKeQkZLc2stxcfEJ9IY-SvLs6_bbaPlU4q525HRY4VHYmg3gesXsKI_km2LJnMX0UmicOYZ-pAPlb_7kbG4L7--mL-BL0dd--NyrCmzrpPAokarUjocVtA1_IUBBb8f7wvWGODpA__Lbh5WzOinL7FRHDDD5eVnHby_xKM_WMQNxgaWubaNoNv1yZdDC_0Lt4IfO45n2XDOHh9yzJuwbVQXIdewfsbp1ylyJ1RVVowntI9q3slDMynJE1Dy1RnGXd2c76VDRPQ")' }}></div>
                        </div>
                    </header>
                    {/* Page Content */}
                    <div className="flex-1 p-6 space-y-6 overflow-auto">
                       {pageConfig[activePage].component}
                    </div>
                </main>
                <NotificationsPanel 
                    isOpen={isNotifOpen} 
                    onClose={() => { lastCloseAt.current = Date.now(); setIsNotifOpen(false); }} 
                    items={notifications as any}
                    onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, status: 'read' })))}
                />
            </div>
        </div>
    );
};

export default SuperAdmin;
