export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface Addon {
    id: string;
    name: string;
    price: number;
}

export interface PopularItem {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    alt: string;
    addonIds?: string[];
}

export interface ProductCustomization {
    meatPoint?: string;
    addons: { [key: string]: boolean };
}

export interface CartItem extends PopularItem {
    id: string;
    quantity: number;
    customization: ProductCustomization;
}

export interface MenuItem {
    id: string;
    name: string;
    price: string;
    image: string;
    alt: string;
    category: string;
    available: boolean;
}

export interface CarouselImage {
    id: string;
    src: string;
}

export interface Address {
    id: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
}

export interface PaymentMethod {
    id: string;
    last4: string;
    cardHolder: string;
    expiryDate: string; // "MM/YY"
    brand: string;
}

export interface SideMenuItem {
    id: string;
    icon: string;
    label: string;
    view?: 'home' | 'pedidos' | 'perfil' | 'enderecos' | 'paymentMethods';
}

export interface ThemeSettings {
    primaryColor: string;
    darkMode: boolean;
}