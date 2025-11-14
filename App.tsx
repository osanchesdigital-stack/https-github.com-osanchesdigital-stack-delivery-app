import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import ImageCarousel from './components/ImageCarousel';
import Categories from './components/Categories';
import Favorites from './components/Favorites';
import PopularItems from './components/PopularItems';
import BottomNav from './components/BottomNav';
import SearchBar from './components/SearchBar';
import { PopularItem, CartItem, ProductCustomization, CarouselImage, Category, SideMenuItem, ThemeSettings, Address, PaymentMethod, Addon } from './types';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import AdminPanel from './components/AdminPanel';
import ManageMenu from './components/ManageMenu';
import Pedidos from './components/Pedidos';
import Perfil from './components/Perfil';
import Enderecos from './components/Enderecos';
import PaymentMethods from './components/PaymentMethods';
import SuperAdmin from './components/SuperAdmin';

type View = 'home' | 'product' | 'cart' | 'checkout' | 'confirmation' | 'admin' | 'manageMenu' | 'pedidos' | 'perfil' | 'enderecos' | 'paymentMethods' | 'superAdmin';

const initialAddons: Addon[] = [
    { id: 'addon1', name: 'Farofa da casa', price: 4.00 },
    { id: 'addon2', name: 'Vinagrete fresco', price: 3.00 },
    { id: 'addon3', name: 'Melaço de cana', price: 2.50 },
];

const initialPopularItems: PopularItem[] = [
    {
        id: 'pop1',
        name: 'Espeto de Picanha',
        description: 'Cortes nobres de picanha, macia e suculenta.',
        price: '24.90',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDgv3wmHmAR1Ah934JyM_VicYDMC-lvVZMN8dxmSBXkLO3L_fc4EpW7eCpA7Y8hsYtVoif0-QOLKnjGKNUM-onKUYsIzvLMiwsXZ0z9Og0orrZhze8MEjUio22rxK5Fm3607HZ_iRAeAGK03L5NDPJSwOJSepri7MDeUxijEQYRAXh43KunCUGTEhIjaRXrOhUf60kSUzBNUoIROo9aSt_SXnvow0_0gVBcRQQYLshQZbs7M4_yTJI6O4I00L4tP7V79k6Kgyy0wo',
        alt: 'Espeto de picanha suculento e grelhado.',
        addonIds: ['addon1', 'addon2'],
    },
    {
        id: 'pop2',
        name: 'Pão de Alho Especial',
        description: 'Receita da casa, cremoso e crocante.',
        price: '9.90',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkiNpDN_MMN--Z4mcrSJG6BaIXJ6OrrfAvfb6IeW_RjtrY67z4_H9jaF4Hihtn--E-MnV61QDScErwEgEdUmzEckgXKWFcEiC7OrEpKHTfwmzkUZUxJprqAxZGA-0I2JNRQcu1joNj7pOhMqqcsDy5MtvVJ8W_YK1BmaYqgZz5SCtIWaQLR1ldwm4TEoomibM5DX0kKFjpwdC_QBF5aLozgBKl13m4YABf1NQi-V7RHll3-nzyhVw7GnE15v2nS6bGanW-AdPwUmM',
        alt: 'Pão de alho recheado e dourado na grelha.',
    },
    {
        id: 'pop3',
        name: 'Espeto de Coração de Frango',
        description: 'Coração de frango temperado no ponto certo.',
        price: '11.90',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeHhLn6REIhYwaYGYQ0qO2P1prdaBnJJXB0TOcontkRLkI6juNZhA0XsE2KCPqjjWTaRtU4vHKOUwnToDRrjxAHzrBDTQV2pvl_2QdEto_RdH4rRRA2yPDXqipklRPs_kNbr49ecFIbWfmiUFIT19AhFWLGoFqbsF3W0G1AZeFWZmmdDm-nv--lnzqkSDhw2x9HuzD_h7jN-Eu2REkrA4v1Q703mqySP4cyNtCyS6wzvuLDctvBq-VO3pKthargxrNiVyjiWI3wGs',
        alt: 'Espeto com corações de frango temperados.',
        addonIds: ['addon1'],
    },
];

const initialFavoriteItems: PopularItem[] = [
    {
        id: 'fav1',
        name: 'Pão de Alho Especial',
        description: 'Receita da casa, cremoso e crocante.',
        price: '9.90',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkiNpDN_MMN--Z4mcrSJG6BaIXJ6OrrfAvfb6IeW_RjtrY67z4_H9jaF4Hihtn--E-MnV61QDScErwEgEdUmzEckgXKWFcEiC7OrEpKHTfwmzkUZUxJprqAxZGA-0I2JNRQcu1joNj7pOhMqqcsDy5MtvVJ8W_YK1BmaYqgZz5SCtIWaQLR1ldwm4TEoomibM5DX0kKFjpwdC_QBF5aLozgBKl13m4YABf1NQi-V7RHll3-nzyhVw7GnE15v2nS6bGanW-AdPwUmM',
        alt: 'Pão de alho recheado e dourado na grelha.',
    },
    {
        id: 'fav2',
        name: 'Espeto de Coração',
        description: 'Temperado no ponto certo.',
        price: '11.90',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeHhLn6REIhYwaYGYQ0qO2P1prdaBnJJXB0TOcontkRLkI6juNZhA0XsE2KCPqjjWTaRtU4vHKOUwnToDRrjxAHzrBDTQV2pvl_2QdEto_RdH4rRRA2yPDXqipklRPs_kNbr49ecFIbWfmiUFIT19AhFWLGoFqbsF3W0G1AZeFWZmmdDm-nv--lnzqkSDhw2x9HuzD_h7jN-Eu2REkrA4v1Q703mqySP4cyNtCyS6wzvuLDctvBq-VO3pKthargxrNiVyjiWI3wGs',
        alt: 'Espeto com corações de frango temperados.',
        addonIds: ['addon1'],
    },
    {
        id: 'fav3',
        name: 'Queijo Coalho na Brasa',
        description: 'Com um toque de melaço de cana.',
        price: '10.90',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQ5YJAlEQm8cZrinFuc-AaoaAeYMDkHXyKVm5kiwPIku8Lew__phSHnrbAk-H0GOPZIo301sSX0QkMCNs9zMltsrp6MAlRYrXXpewomobLG-GQ0kplhJWmjnSmI_cxXsQYXJh9SONs3xndZzUcrlUqdY5XrCUzCJyykyd79ZedVxuPt1rIYk29_1VO8xBXS9zv6xrs84qWE2n02vhmy2HtPrH2mDAuDK7bR04NiqfYi6mrRlOXzuQw4nx5_dxh28UN-jeqNEWYCI',
        alt: 'Espeto de queijo coalho grelhado.',
        addonIds: ['addon3'],
    },
    {
        id: 'fav4',
        name: 'Espeto de Picanha',
        description: 'Cortes nobres, macia e suculenta.',
        price: '24.90',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDgv3wmHmAR1Ah934JyM_VicYDMC-lvVZMN8dxmSBXkLO3L_fc4EpW7eCpA7Y8hsYtVoif0-QOLKnjGKNUM-onKUYsIzvLMiwsXZ0z9Og0orrZhze8MEjUio22rxK5Fm3607HZ_iRAeAGK03L5NDPJSwOJSepri7MDeUxijEQYRAXh43KunCUGTEhIjaRXrOhUf60kSUzBNUoIROo9aSt_SXnvow0_0gVBcRQQYLshQZbs7M4_yTJI6O4I00L4tP7V79k6Kgyy0wo',
        alt: 'Espeto de picanha suculento e grelhado.',
        addonIds: ['addon1', 'addon2'],
    },
];

const initialCarouselImages: CarouselImage[] = [
    { id: 'car1', src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdQ5YJAlEQm8cZrinFuc-AaoaAeYMDkHXyKVm5kiwPIku8Lew__phSHnrbAk-H0GOPZIo301sSX0QkMCNs9zMltsrp6MAlRYrXXpewomobLG-GQ0kplhJWmjnSmI_cxXsQYXJh9SONs3xndZzUcrlUqdY5XrCUzCJyykyd79ZedVxuPt1rIYk29_1VO8xBXS9zv6xrs84qWE2n02vhmy2HtPrH2mDAuDK7bR04NiqfYi6mrRlOXzuQw4nx5_dxh28UN-jeqNEWYCI" },
    { id: 'car2', src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv76kpqiXoI0UYZoQ-Y2RiuaBBzz7yMXw-38xtRba7J3QJBysErRMZUGUXiyDHn07gCR4XImcHRLiodHEZT3Fxgy5r_eQloZUpK7__89WoXmj1HXul8a-nqc4E3g_aBWGgz7RdnchKJD5wMpKmSoIigmyc-3d9yLM8oOyZljAVFz9Ai8zgQe7o0NnXbZ9AQL7Ysym5oOL43JtVfTZCNgGZ4FnQ9rRbG5Zzk59ursHPg87ugqbLL2aT2ifhgiY441Gzyqs237ZJhzw" },
    { id: 'car3', src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOo-burDS74Bjwx85gEMHxMI6836ZXuL12UC3127r3UteWzkNCFh0qHmg4rGhYRNm8S17fxWnTtGDqEPzOb7nwuKceK2zWfAqSMFgUHvxISL12ap1mPgrbXKz3zeo0JbuidImQh7kIbqk3TpNfOWHe870WJvkl9MpxmjY8wXMMDFYBXSHLL7bx8JIu362mAy2uzCuIJZHXIv7C-hEg6h6vv0ZybqFVmqalJHoG1iSHphltpMNwruWXJxdQR3MwAV_ghPDs3BarqSU" },
];

const initialCategories: Category[] = [
    { id: 'cat1', name: 'Carnes', icon: 'kebab_dining' },
    { id: 'cat2', name: 'Bebidas', icon: 'local_bar' },
    { id: 'cat3', name: 'Saladas', icon: 'grass' },
    { id: 'cat4', name: 'Promo', icon: 'local_offer' },
];

const initialSideMenuItems: SideMenuItem[] = [
    { id: 'side1', icon: 'receipt_long', label: 'Meus Pedidos', view: 'pedidos' },
    { id: 'side2', icon: 'person', label: 'Meu Perfil', view: 'perfil' },
    { id: 'side3', icon: 'home_pin', label: 'Endereços', view: 'enderecos' },
    { id: 'side4', icon: 'credit_card', label: 'Formas de Pagamento', view: 'paymentMethods' },
    { id: 'side5', icon: 'help', label: 'Ajuda' },
];

const initialAddresses: Address[] = [
    {
        id: 'addr1',
        street: 'Av. Paulista',
        number: '1578',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        zip: '01310-200',
        complement: 'Andar 8',
    },
];

const initialPaymentMethods: PaymentMethod[] = [
    {
        id: 'pm_1',
        last4: '4242',
        cardHolder: 'Neto B.',
        expiryDate: '12/26',
        brand: 'Visa',
    }
];

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentView, setCurrentView] = useState<View>('home');
    const [selectedItem, setSelectedItem] = useState<PopularItem | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [popularItems, setPopularItems] = useState<PopularItem[]>(initialPopularItems);
    const [favoriteItems, setFavoriteItems] = useState<PopularItem[]>(initialFavoriteItems);
    const [carouselImages, setCarouselImages] = useState<CarouselImage[]>(initialCarouselImages);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [sideMenuItems, setSideMenuItems] = useState<SideMenuItem[]>(initialSideMenuItems);
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
    const [addons, setAddons] = useState<Addon[]>(initialAddons);
    const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
        primaryColor: '#f2590d',
        darkMode: document.documentElement.classList.contains('dark'),
    });
    // Super Admin State
    const [businessStatus, setBusinessStatus] = useState<'open' | 'closed'>('open');
    const [deliveryFee, setDeliveryFee] = useState<number>(5.00);
    const [minOrderValue, setMinOrderValue] = useState<number>(15.00);

    const [establishment, setEstablishment] = useState({
        name: 'Churrasquinho do Netão',
        logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAf69lmql1aMDbOeK_hlLU4feFrArL9Z7rjVqB6eSZRh4nwL1ii8J_-vEQoQ0tkPaiwe_AsazONNZhxPhMUk5FZCXgEr3NC9Oj-5Iep-aFWOVKSE6VCw1FKtrSiGCUfcspFKYvgM4_Y2TTRsjN1FfraywwqDjPATBkn2pFF76BYI9GEMMztUxQLKvRyJhtDWunZr3lZ8HS8We33zLtCJnb4lOsD57FEGxZmlxpFopGzwP-v35-_ySmH6SZyKVDIUYv6Xgk_F8SmWs',
    });

     useEffect(() => {
        const root = document.documentElement;
        if (themeSettings.darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        const hexToHsl = (hex: string) => {
            let r = 0, g = 0, b = 0;
            hex = hex.replace('#', '');
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else if (hex.length === 6) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            }
            r /= 255; g /= 255; b /= 255;
            let cmin = Math.min(r,g,b),
                cmax = Math.max(r,g,b),
                delta = cmax - cmin,
                h = 0, s = 0, l = 0;

            if (delta === 0) h = 0;
            else if (cmax === r) h = ((g - b) / delta) % 6;
            else if (cmax === g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;

            h = Math.round(h * 60);
            if (h < 0) h += 360;

            l = (cmax + cmin) / 2;
            s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);

            return `${h} ${s}% ${l}%`;
        }
        
        root.style.setProperty('--color-primary', hexToHsl(themeSettings.primaryColor));

    }, [themeSettings]);
    
    const handleResetData = () => {
        if (window.confirm("Você tem certeza que deseja resetar todos os dados para o padrão inicial? Esta ação não pode ser desfeita.")) {
            setPopularItems(initialPopularItems);
            setFavoriteItems(initialFavoriteItems);
            setCarouselImages(initialCarouselImages);
            setCategories(initialCategories);
            setSideMenuItems(initialSideMenuItems);
            setAddresses(initialAddresses);
            setPaymentMethods(initialPaymentMethods);
            setAddons(initialAddons);
            setThemeSettings({
                primaryColor: '#f2590d',
                darkMode: document.documentElement.classList.contains('dark'),
            });
            setBusinessStatus('open');
            setDeliveryFee(5.00);
            setMinOrderValue(15.00);
            alert("Dados resetados com sucesso!");
        }
    };


    const isPublicView = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('view') === 'public';
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleSelectItem = (item: PopularItem) => {
        setSelectedItem(item);
        setCurrentView('product');
    };

    const handleBack = () => {
        switch (currentView) {
            case 'checkout':
                setCurrentView('cart');
                break;
            case 'product':
                setSelectedItem(null);
                setCurrentView('home');
                break;
            case 'cart':
            case 'admin':
            case 'enderecos':
            case 'paymentMethods':
                setCurrentView('home');
                break;
            case 'manageMenu':
            case 'superAdmin':
                setCurrentView('admin');
                break;
            default:
                setCurrentView('home');
        }
    };
    
    const handleNavigateToCheckout = () => {
        setCurrentView('checkout');
    }

    const handleNavigateToAdmin = () => {
        setIsMenuOpen(false);
        setCurrentView('admin');
    }

    const handleNavigateToManageMenu = () => {
        setCurrentView('manageMenu');
    }
    
    const handleNavigateToSuperAdmin = () => {
        setCurrentView('superAdmin');
    }

    const handleBottomNavClick = (view: View) => {
        setCurrentView(view);
    };
    
    const handleSideMenuNavigate = (view: 'home' | 'pedidos' | 'perfil' | 'enderecos' | 'paymentMethods') => {
        setCurrentView(view);
        setIsMenuOpen(false);
    };

    const handleConfirmOrder = () => {
        setCartItems([]);
        setCurrentView('confirmation');
    };
    
    const handleGoHome = () => {
        setCurrentView('home');
    };

    const handleAddToCart = (item: PopularItem, quantity: number, customization: ProductCustomization) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name && JSON.stringify(cartItem.customization) === JSON.stringify(customization));
        
        if (existingItemIndex > -1) {
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity += quantity;
            setCartItems(updatedCart);
        } else {
            const newItem: CartItem = {
                ...item,
                id: `${item.name}-${Date.now()}`, // simple unique id
                quantity,
                customization,
            };
            setCartItems(prev => [...prev, newItem]);
        }
        setCurrentView('cart');
    };

    const handleUpdateQuantity = (itemId: string, amount: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, quantity: Math.max(0, item.quantity + amount) }
                : item
        ).filter(item => item.quantity > 0)); // Also remove if quantity is 0
    };

    const handleRemoveItem = (itemId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

    const cartItemCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);


    const renderContent = () => {
         const homeContent = (
            <>
                <SearchBar />
                <ImageCarousel images={carouselImages.map(img => img.src)} />
                <Categories categories={categories} />
                <Favorites items={favoriteItems} onSelectItem={handleSelectItem} />
                <PopularItems items={popularItems} onSelectItem={handleSelectItem} />
            </>
        );

        switch(currentView) {
            case 'product':
                return selectedItem && <ProductDetail item={selectedItem} onBack={handleBack} onAddToCart={handleAddToCart} allAddons={addons} />;
            case 'cart':
                return <Cart items={cartItems} onBack={handleBack} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onCheckout={handleNavigateToCheckout}/>;
            case 'checkout':
                 return <Checkout items={cartItems} onBack={handleBack} onConfirmOrder={handleConfirmOrder} />;
            case 'confirmation':
                return <OrderConfirmation onGoHome={handleGoHome} />;
            case 'admin':
                return <AdminPanel 
                            onBack={handleBack} 
                            onNavigateToManageMenu={handleNavigateToManageMenu} 
                            onNavigateToSuperAdmin={handleNavigateToSuperAdmin}
                            popularItems={popularItems} 
                            setPopularItems={setPopularItems}
                            carouselImages={carouselImages}
                            setCarouselImages={setCarouselImages} 
                            favoriteItems={favoriteItems}
                            setFavoriteItems={setFavoriteItems}
                            categories={categories}
                            setCategories={setCategories}
                            sideMenuItems={sideMenuItems}
                            setSideMenuItems={setSideMenuItems}
                            themeSettings={themeSettings}
                            setThemeSettings={setThemeSettings}
                            addons={addons}
                            setAddons={setAddons}
                            establishment={establishment}
                            setEstablishment={setEstablishment}
                        />;
            case 'manageMenu':
                return <ManageMenu onBack={handleBack} />;
            case 'superAdmin':
                return <SuperAdmin onBack={() => setCurrentView('admin')} />;
            case 'enderecos':
                return <Enderecos onBack={handleBack} addresses={addresses} setAddresses={setAddresses} />;
            case 'paymentMethods':
                return <PaymentMethods onBack={handleBack} paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods} />;
            case 'pedidos':
            case 'perfil':
            case 'home':
            default:
                return (
                    <>
                        <div className="flex-1 pb-28">
                            <Header 
                                onMenuClick={toggleMenu} 
                                onCartClick={() => setCurrentView('cart')} 
                                cartItemCount={cartItemCount} 
                                establishmentName={establishment.name}
                                establishmentLogoUrl={establishment.logoUrl}
                            />
                            <main>
                                {currentView === 'pedidos' && <Pedidos />}
                                {currentView === 'perfil' && <Perfil />}
                                {currentView === 'home' && homeContent}
                            </main>
                        </div>
                        <BottomNav currentView={currentView} onNavigate={handleBottomNavClick} />
                    </>
                );
        }
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display text-text-primary-light dark:text-text-primary-dark bg-background-light dark:bg-background-dark">
            <SideMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                onNavigateToAdmin={handleNavigateToAdmin} 
                items={sideMenuItems} 
                isPublicView={isPublicView} 
                onNavigate={handleSideMenuNavigate} 
            />
            {renderContent()}
        </div>
    );
};

export default App;