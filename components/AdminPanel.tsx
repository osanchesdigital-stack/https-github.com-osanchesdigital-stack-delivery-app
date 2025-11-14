import React, { useState, useRef, useEffect } from 'react';
import { PopularItem, CarouselImage, Category, SideMenuItem, ThemeSettings, Addon } from '../types';
import { supabase } from '../supabaseClient';

interface AdminPanelProps {
    onBack: () => void;
    onNavigateToManageMenu: () => void;
    onNavigateToSuperAdmin: () => void;
    popularItems: PopularItem[];
    setPopularItems: React.Dispatch<React.SetStateAction<PopularItem[]>>;
    carouselImages: CarouselImage[];
    setCarouselImages: React.Dispatch<React.SetStateAction<CarouselImage[]>>;
    favoriteItems: PopularItem[];
    setFavoriteItems: React.Dispatch<React.SetStateAction<PopularItem[]>>;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    sideMenuItems: SideMenuItem[];
    setSideMenuItems: React.Dispatch<React.SetStateAction<SideMenuItem[]>>;
    themeSettings: ThemeSettings;
    setThemeSettings: React.Dispatch<React.SetStateAction<ThemeSettings>>;
    addons: Addon[];
    setAddons: React.Dispatch<React.SetStateAction<Addon[]>>;
    establishment: { name: string; logoUrl: string; };
    setEstablishment: React.Dispatch<React.SetStateAction<{ name: string; logoUrl: string; }>>;
}

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};


const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, onNavigateToManageMenu, onNavigateToSuperAdmin, popularItems, setPopularItems, carouselImages, setCarouselImages, favoriteItems, setFavoriteItems, categories, setCategories, sideMenuItems, setSideMenuItems, themeSettings, setThemeSettings, addons, setAddons, establishment, setEstablishment }) => {
    // --- State for Popular Items ---
    const [newItemName, setNewItemName] = useState('');
    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemImage, setNewItemImage] = useState<string | null>(null);
    const [newItemAddonIds, setNewItemAddonIds] = useState<string[]>([]);
    const newItemImageInputRef = useRef<HTMLInputElement>(null);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editItemData, setEditItemData] = useState<Partial<PopularItem>>({});
    const editItemImageInputRef = useRef<HTMLInputElement>(null);
    const [draggedItem, setDraggedItem] = useState<PopularItem | null>(null);

    // --- State for Carousel ---
    const [draggedCarouselImage, setDraggedCarouselImage] = useState<CarouselImage | null>(null);

    // --- State for Queridinhos (Favorites) ---
    const [newFavItemName, setNewFavItemName] = useState('');
    const [newFavItemDesc, setNewFavItemDesc] = useState('');
    const [newFavItemPrice, setNewFavItemPrice] = useState('');
    const [newFavItemImage, setNewFavItemImage] = useState<string | null>(null);
    const [newFavItemAddonIds, setNewFavItemAddonIds] = useState<string[]>([]);
    const newFavItemImageInputRef = useRef<HTMLInputElement>(null);
    const [editingFavItemId, setEditingFavItemId] = useState<string | null>(null);
    const [editFavItemData, setEditFavItemData] = useState<Partial<PopularItem>>({});
    const editFavItemImageInputRef = useRef<HTMLInputElement>(null);
    const [draggedFavItem, setDraggedFavItem] = useState<PopularItem | null>(null);
    
    // --- State for Categories ---
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editCategoryData, setEditCategoryData] = useState<Partial<Category>>({});
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryIcon, setNewCategoryIcon] = useState('');
    const [draggedCategory, setDraggedCategory] = useState<Category | null>(null);

    // --- State for Side Menu ---
    const [editingSideMenuItemId, setEditingSideMenuItemId] = useState<string | null>(null);
    const [editSideMenuItemData, setEditSideMenuItemData] = useState<Partial<SideMenuItem>>({});
    const [newSideMenuItemLabel, setNewSideMenuItemLabel] = useState('');
    const [newSideMenuItemIcon, setNewSideMenuItemIcon] = useState('');
    const [draggedSideMenuItem, setDraggedSideMenuItem] = useState<SideMenuItem | null>(null);
    
    // --- State for Sharing ---
    const [copyStatus, setCopyStatus] = useState('Copiar Link');
    const publicUrl = `${window.location.origin}${window.location.pathname}?view=public`;

    // --- State for Addons ---
    const [newAddonName, setNewAddonName] = useState('');
    const [newAddonPrice, setNewAddonPrice] = useState('');
    const [editingAddonId, setEditingAddonId] = useState<string | null>(null);
    const [editAddonData, setEditAddonData] = useState<Partial<Addon>>({});


    // --- Handlers for Popular Items ---
    const handleAddNewItemImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setNewItemImage(base64);
        }
    };
    
    const handleNewItemAddonsChange = (addonId: string) => {
        setNewItemAddonIds(prev =>
            prev.includes(addonId)
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
        );
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemName.trim() || !newItemPrice.trim()) {
            alert('Nome e Preço são obrigatórios.');
            return;
        }
        const newItem: PopularItem = {
            id: `pop-${Date.now()}`,
            name: newItemName,
            description: newItemDesc,
            price: newItemPrice,
            image: newItemImage || 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"150\"><rect width=\"100%25\" height=\"100%25\" fill=\"%23e2e8f0\"/><text x=\"50%25\" y=\"50%25\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"%23333\" font-family=\"Arial\" font-size=\"18\">IMG</text></svg>',
            alt: `Imagem de ${newItemName}`,
            addonIds: newItemAddonIds,
        };
        setPopularItems(prev => [...prev, newItem]);
        // Reset form
        setNewItemName('');
        setNewItemDesc('');
        setNewItemPrice('');
        setNewItemImage(null);
        setNewItemAddonIds([]);
        if (newItemImageInputRef.current) {
            newItemImageInputRef.current.value = '';
        }
    };

    const handleRemoveItem = (idToRemove: string) => {
        setPopularItems(prev => prev.filter(item => item.id !== idToRemove));
    };

    const handleStartEdit = (item: PopularItem) => {
        setEditingItemId(item.id);
        setEditItemData(item);
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditItemData({});
    };
    
    const handleEditChange = (field: keyof PopularItem, value: string) => {
        setEditItemData(prev => ({...prev, [field]: value}));
    };
    
    const handleEditItemAddonsChange = (addonId: string) => {
        const currentAddonIds = editItemData.addonIds || [];
        const newAddonIds = currentAddonIds.includes(addonId)
            ? currentAddonIds.filter(id => id !== addonId)
            : [...currentAddonIds, addonId];
        setEditItemData(prev => ({...prev, addonIds: newAddonIds}));
    };

    const handleEditItemImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const base64 = await fileToBase64(file);
            setEditItemData(prev => ({ ...prev, image: base64 }));
        }
    };

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItemId) return;

        setPopularItems(prevItems =>
            prevItems.map(item =>
                item.id === editingItemId ? { ...item, ...editItemData, alt: `Imagem de ${editItemData.name || item.name}` } as PopularItem : item
            )
        );
        handleCancelEdit();
    };

    const onDragStartItem = (e: React.DragEvent, item: PopularItem) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDropItem = (e: React.DragEvent, targetItem: PopularItem) => {
        if (!draggedItem || draggedItem.id === targetItem.id) return;

        const currentIndex = popularItems.findIndex(item => item.id === draggedItem.id);
        const targetIndex = popularItems.findIndex(item => item.id === targetItem.id);

        if (currentIndex !== -1 && targetIndex !== -1) {
            const newItems = [...popularItems];
            const [removed] = newItems.splice(currentIndex, 1);
            newItems.splice(targetIndex, 0, removed);
            setPopularItems(newItems);
        }
        setDraggedItem(null);
    };

    // --- Carousel Image Handlers ---
    const handleAddCarouselImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            const newImage: CarouselImage = { id: `car-${Date.now()}`, src: base64 };
            setCarouselImages(prev => [...prev, newImage]);
        }
    };

    const [isUploading, setIsUploading] = useState(false);
    const [establishmentName, setEstablishmentName] = useState(establishment?.name ?? '');
    const [logoUrl, setLogoUrl] = useState(establishment?.logoUrl ?? '');
    const [newLogoFile, setNewLogoFile] = useState<File | null>(null);

    useEffect(() => {
        setEstablishmentName(establishment?.name ?? '');
        setLogoUrl(establishment?.logoUrl ?? '');
    }, [establishment]);

    const handleReplaceCarouselImage = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const base64 = await fileToBase64(file);
            setCarouselImages(prev => prev.map(img => img.id === id ? { ...img, src: base64 } : img));
        }
    };

    const handleRemoveCarouselImage = (id: string) => {
        setCarouselImages(prev => prev.filter(img => img.id !== id));
    };

    const onDragStartCarousel = (e: React.DragEvent, image: CarouselImage) => {
        setDraggedCarouselImage(image);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDropCarousel = (e: React.DragEvent, targetImage: CarouselImage) => {
        if (!draggedCarouselImage || draggedCarouselImage.id === targetImage.id) return;
        
        const currentIndex = carouselImages.findIndex(img => img.id === draggedCarouselImage.id);
        const targetIndex = carouselImages.findIndex(img => img.id === targetImage.id);
        
        if (currentIndex !== -1 && targetIndex !== -1) {
            const newImages = [...carouselImages];
            const [removed] = newImages.splice(currentIndex, 1);
            newImages.splice(targetIndex, 0, removed);
            setCarouselImages(newImages);
        }
        setDraggedCarouselImage(null);
    };

    // --- Handlers for Queridinhos (Favorites) ---
    const handleAddNewFavItemImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setNewFavItemImage(base64);
        }
    };
    
    const handleNewFavItemAddonsChange = (addonId: string) => {
        setNewFavItemAddonIds(prev =>
            prev.includes(addonId)
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
        );
    };

    const handleAddFavItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFavItemName.trim() || !newFavItemPrice.trim()) {
            alert('Nome e Preço são obrigatórios.');
            return;
        }
        const newItem: PopularItem = {
            id: `fav-${Date.now()}`,
            name: newFavItemName,
            description: newFavItemDesc,
            price: newFavItemPrice,
            image: newFavItemImage || 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"150\"><rect width=\"100%25\" height=\"100%25\" fill=\"%23e2e8f0\"/><text x=\"50%25\" y=\"50%25\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"%23333\" font-family=\"Arial\" font-size=\"18\">IMG</text></svg>',
            alt: `Imagem de ${newFavItemName}`,
            addonIds: newFavItemAddonIds,
        };
        setFavoriteItems(prev => [...prev, newItem]);
        setNewFavItemName('');
        setNewFavItemDesc('');
        setNewFavItemPrice('');
        setNewFavItemImage(null);
        setNewFavItemAddonIds([]);
        if (newFavItemImageInputRef.current) {
            newFavItemImageInputRef.current.value = '';
        }
    };

    const handleRemoveFavItem = (idToRemove: string) => {
        setFavoriteItems(prev => prev.filter(item => item.id !== idToRemove));
    };

    const handleStartEditFav = (item: PopularItem) => {
        setEditingFavItemId(item.id);
        setEditFavItemData(item);
    };

    const handleCancelEditFav = () => {
        setEditingFavItemId(null);
        setEditFavItemData({});
    };

    const handleEditFavChange = (field: keyof PopularItem, value: string) => {
        setEditFavItemData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleEditFavItemAddonsChange = (addonId: string) => {
        const currentAddonIds = editFavItemData.addonIds || [];
        const newAddonIds = currentAddonIds.includes(addonId)
            ? currentAddonIds.filter(id => id !== addonId)
            : [...currentAddonIds, addonId];
        setEditFavItemData(prev => ({...prev, addonIds: newAddonIds}));
    };

    const handleEditFavItemImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setEditFavItemData(prev => ({ ...prev, image: base64 }));
        }
    };

    const handleSaveEditFav = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingFavItemId) return;
        setFavoriteItems(prevItems =>
            prevItems.map(item =>
                item.id === editingFavItemId ? { ...item, ...editFavItemData, alt: `Imagem de ${editFavItemData.name || item.name}` } as PopularItem : item
            )
        );
        handleCancelEditFav();
    };

    const onDragStartFavItem = (e: React.DragEvent, item: PopularItem) => {
        setDraggedFavItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDropFavItem = (e: React.DragEvent, targetItem: PopularItem) => {
        if (!draggedFavItem || draggedFavItem.id === targetItem.id) return;
        const currentIndex = favoriteItems.findIndex(item => item.id === draggedFavItem.id);
        const targetIndex = favoriteItems.findIndex(item => item.id === targetItem.id);
        if (currentIndex !== -1 && targetIndex !== -1) {
            const newItems = [...favoriteItems];
            const [removed] = newItems.splice(currentIndex, 1);
            newItems.splice(targetIndex, 0, removed);
            setFavoriteItems(newItems);
        }
        setDraggedFavItem(null);
    };
    
    // --- Handlers for Categories ---
    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim() || !newCategoryIcon.trim()) {
            alert('Nome e Ícone da Categoria são obrigatórios.');
            return;
        }
        const newCategory: Category = {
            id: `cat-${Date.now()}`,
            name: newCategoryName,
            icon: newCategoryIcon,
        };
        setCategories(prev => [...prev, newCategory]);
        setNewCategoryName('');
        setNewCategoryIcon('');
    };

    const handleRemoveCategory = (idToRemove: string) => {
        setCategories(prev => prev.filter(cat => cat.id !== idToRemove));
    };

    const handleStartEditCategory = (category: Category) => {
        setEditingCategoryId(category.id);
        setEditCategoryData(category);
    };

    const handleCancelEditCategory = () => {
        setEditingCategoryId(null);
        setEditCategoryData({});
    };
    
    const handleEditCategoryChange = (field: keyof Category, value: string) => {
        setEditCategoryData(prev => ({...prev, [field]: value}));
    };

    const handleSaveEditCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategoryId) return;

        setCategories(prevCategories =>
            prevCategories.map(cat =>
                cat.id === editingCategoryId ? { ...cat, ...editCategoryData } as Category : cat
            )
        );
        handleCancelEditCategory();
    };

    const onDragStartCategory = (e: React.DragEvent, category: Category) => {
        setDraggedCategory(category);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDropCategory = (e: React.DragEvent, targetCategory: Category) => {
        if (!draggedCategory || draggedCategory.id === targetCategory.id) return;

        const currentIndex = categories.findIndex(cat => cat.id === draggedCategory.id);
        const targetIndex = categories.findIndex(cat => cat.id === targetCategory.id);

        if (currentIndex !== -1 && targetIndex !== -1) {
            const newCategories = [...categories];
            const [removed] = newCategories.splice(currentIndex, 1);
            newCategories.splice(targetIndex, 0, removed);
            setCategories(newCategories);
        }
        setDraggedCategory(null);
    };

    // --- Handlers for Side Menu ---
    const handleAddSideMenuItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSideMenuItemLabel.trim() || !newSideMenuItemIcon.trim()) {
            alert('Rótulo e Ícone são obrigatórios.');
            return;
        }
        const newItem: SideMenuItem = {
            id: `side-${Date.now()}`,
            label: newSideMenuItemLabel,
            icon: newSideMenuItemIcon,
        };
        setSideMenuItems(prev => [...prev, newItem]);
        setNewSideMenuItemLabel('');
        setNewSideMenuItemIcon('');
    };

    const handleRemoveSideMenuItem = (idToRemove: string) => {
        setSideMenuItems(prev => prev.filter(item => item.id !== idToRemove));
    };

    const handleStartEditSideMenuItem = (item: SideMenuItem) => {
        setEditingSideMenuItemId(item.id);
        setEditSideMenuItemData(item);
    };

    const handleCancelEditSideMenuItem = () => {
        setEditingSideMenuItemId(null);
        setEditSideMenuItemData({});
    };

    const handleEditSideMenuItemChange = (field: keyof SideMenuItem, value: string) => {
        setEditSideMenuItemData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveEditSideMenuItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSideMenuItemId) return;

        setSideMenuItems(prevItems =>
            prevItems.map(item =>
                item.id === editingSideMenuItemId ? { ...item, ...editSideMenuItemData } as SideMenuItem : item
            )
        );
        handleCancelEditSideMenuItem();
    };

    const onDragStartSideMenuItem = (e: React.DragEvent, item: SideMenuItem) => {
        setDraggedSideMenuItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDropSideMenuItem = (e: React.DragEvent, targetItem: SideMenuItem) => {
        if (!draggedSideMenuItem || draggedSideMenuItem.id === targetItem.id) return;

        const currentIndex = sideMenuItems.findIndex(item => item.id === draggedSideMenuItem.id);
        const targetIndex = sideMenuItems.findIndex(item => item.id === targetItem.id);

        if (currentIndex !== -1 && targetIndex !== -1) {
            const newItems = [...sideMenuItems];
            const [removed] = newItems.splice(currentIndex, 1);
            newItems.splice(targetIndex, 0, removed);
            setSideMenuItems(newItems);
        }
        setDraggedSideMenuItem(null);
    };

    // --- Share Handler ---
    const handleCopyLink = () => {
        navigator.clipboard.writeText(publicUrl).then(() => {
            setCopyStatus('Copiado!');
            setTimeout(() => setCopyStatus('Copiar Link'), 2000);
        }).catch(err => {
            console.error('Falha ao copiar: ', err);
            alert('Falha ao copiar o link.');
            setCopyStatus('Falhou!');
        });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadLogo = async () => {
        if (!newLogoFile) return logoUrl;

        setIsUploading(true);
        const fileName = `${Date.now()}_${newLogoFile.name}`;
        const { data, error } = await supabase.storage
            .from('logos')
            .upload(fileName, newLogoFile, {
                cacheControl: '3600',
                upsert: false,
            });

        setIsUploading(false);
        if (error) {
            console.error('Error uploading logo:', error);
            return logoUrl;
        }

        const { publicURL } = supabase.storage.from('logos').getPublicUrl(fileName);
        return publicURL;
    };

    const handleSave = async () => {
        let newLogoUrl = logoUrl;
        if (newLogoFile) {
            newLogoUrl = await uploadLogo();
        }

        setEstablishment(prev => ({ ...prev, name: establishmentName, logoUrl: newLogoUrl }));
        alert('Identidade visual atualizada.');
    };

    // --- Handlers for Addons ---
    const handleAddAddon = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(newAddonPrice);
        if (!newAddonName.trim() || isNaN(price)) {
            alert('Nome e Preço válido são obrigatórios.');
            return;
        }
        const newAddon: Addon = {
            id: `addon-${Date.now()}`,
            name: newAddonName,
            price: price,
        };
        setAddons(prev => [...prev, newAddon]);
        setNewAddonName('');
        setNewAddonPrice('');
    };

    const handleRemoveAddon = (id: string) => {
        if (window.confirm("Remover este adicional também o removerá de todos os produtos vinculados. Deseja continuar?")) {
            setAddons(prev => prev.filter(a => a.id !== id));
            // Optional: Also clean up addonIds from items
            setPopularItems(prev => prev.map(item => ({...item, addonIds: item.addonIds?.filter(addonId => addonId !== id)})));
            setFavoriteItems(prev => prev.map(item => ({...item, addonIds: item.addonIds?.filter(addonId => addonId !== id)})));
        }
    };

    const handleStartEditAddon = (addon: Addon) => {
        setEditingAddonId(addon.id);
        setEditAddonData({ name: addon.name, price: addon.price });
    };

    const handleCancelEditAddon = () => {
        setEditingAddonId(null);
        setEditAddonData({});
    };
    
    const handleEditAddonChange = (field: keyof Addon, value: string) => {
        const isPrice = field === 'price';
        setEditAddonData(prev => ({...prev, [field]: isPrice ? parseFloat(value) || 0 : value}));
    };

    const handleSaveEditAddon = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAddonId) return;
        setAddons(prev =>
            prev.map(addon =>
                addon.id === editingAddonId ? { ...addon, ...editAddonData } as Addon : addon
            )
        );
        handleCancelEditAddon();
    };


    if (!establishment) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden text-text-light dark:text-text-dark">
            <div className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-border-light dark:border-border-dark">
                <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-center">
                    <span className="material-symbols-outlined text-text-light dark:text-text-dark text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-text-light dark:text-text-dark">Painel de Controle</h1>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-text-light dark:text-text-dark gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                        <span className="material-symbols-outlined text-text-light dark:text-text-dark text-2xl">share</span>
                    </button>
                </div>
            </div>
            <main className="flex-grow pb-24">
                <div className="flex flex-col p-4 gap-4">
                     <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Identidade Visual</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                        <div className="pt-2 pb-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Logo</label>
                                <div className="flex items-center gap-3">
                                    <img src={logoUrl} alt="Logo preview" className="w-20 h-20 object-cover rounded-full" />
                                    <label htmlFor="logo-upload" className="flex-1 cursor-pointer text-center py-2 px-4 bg-primary/10 text-primary rounded-md text-sm font-semibold">
                                        {isUploading ? 'Enviando...' : 'Escolher Imagem'}
                                    </label>
                                    <input id="logo-upload" type="file" accept="image/*" className="sr-only" onChange={handleLogoChange} disabled={isUploading} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="establishment-name">Nome do Estabelecimento</label>
                                <input 
                                    value={establishmentName} 
                                    onChange={(e) => setEstablishmentName(e.target.value)} 
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" 
                                    id="establishment-name" 
                                    type="text" 
                                />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button onClick={handleSave} className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-xs font-bold leading-normal">Salvar Identidade</button>
                                <button onClick={onBack} className="flex items-center justify-center rounded-lg h-9 px-4 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-xs font-bold leading-normal">Voltar</button>
                            </div>
                        </div>
                    </details>
                    <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Acesso Restrito</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                        <div className="pt-2 pb-4">
                            <button onClick={onNavigateToSuperAdmin} className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-red-600/20 text-red-500 gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                                <span className="material-symbols-outlined text-xl">security</span>
                                <span className="truncate">Painel Super Admin</span>
                            </button>
                        </div>
                    </details>
                    <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Imagens do Carrossel</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                         <div className="pt-2 pb-4 space-y-4">
                            <div className="space-y-3">
                                {carouselImages.map((image) => (
                                     <div 
                                        key={image.id}
                                        className={`flex items-center gap-3 rounded-lg border border-border-light dark:border-border-dark p-3 transition-opacity ${draggedCarouselImage && draggedCarouselImage.id === image.id ? 'opacity-50' : ''}`}
                                        draggable
                                        onDragStart={(e) => onDragStartCarousel(e, image)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => onDropCarousel(e, image)}
                                        onDragEnd={() => setDraggedCarouselImage(null)}
                                    >
                                        <span className="material-symbols-outlined cursor-grab text-gray-400 dark:text-gray-500">drag_indicator</span>
                                        <div className="w-24 h-14 bg-center bg-no-repeat bg-cover rounded-md flex-shrink-0" style={{backgroundImage: `url("${image.src}")`}}></div>
                                        <div className="flex-grow flex items-center justify-end gap-2">
                                            <label className="flex items-center justify-center rounded-lg h-9 px-3 bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark gap-1.5 text-xs font-bold leading-normal cursor-pointer">
                                                <span className="material-symbols-outlined text-base">swap_horiz</span>
                                                <span>Substituir</span>
                                                <input type="file" accept="image/*" className="sr-only" onChange={(e) => handleReplaceCarouselImage(image.id, e)} />
                                            </label>
                                            <button onClick={() => handleRemoveCarouselImage(image.id)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                                <span className="material-symbols-outlined text-base">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <label className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                                <span className="material-symbols-outlined text-xl">add_photo_alternate</span>
                                <span className="truncate">Adicionar Nova Imagem</span>
                                <input type="file" accept="image/*" className="sr-only" onChange={handleAddCarouselImage} />
                            </label>
                         </div>
                    </details>
                    
                    <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Adicionais</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                        <div className="pt-2 pb-4 space-y-6">
                            <div className="space-y-4">
                                {addons.map(addon => (
                                    editingAddonId === addon.id ? (
                                        <form key={addon.id} onSubmit={handleSaveEditAddon} className="flex flex-col gap-4 rounded-lg border-2 border-primary p-4">
                                            <h3 className="text-base font-bold text-text-light dark:text-text-dark">Editando Adicional</h3>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-addon-name-${addon.id}`}>Nome</label>
                                                <input value={editAddonData.name} onChange={(e) => handleEditAddonChange('name', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-addon-name-${addon.id}`} type="text" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-addon-price-${addon.id}`}>Preço</label>
                                                <input value={editAddonData.price} onChange={(e) => handleEditAddonChange('price', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-addon-price-${addon.id}`} type="number" step="0.01" required />
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button type="button" onClick={handleCancelEditAddon} className="flex items-center justify-center rounded-lg h-9 px-4 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-xs font-bold leading-normal">Cancelar</button>
                                                <button type="submit" className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-xs font-bold leading-normal">Salvar</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div key={addon.id} className="flex items-center gap-3 rounded-lg border border-border-light dark:border-border-dark p-3">
                                            <div className="flex-grow">
                                                <p className="font-bold text-text-light dark:text-text-dark">{addon.name}</p>
                                                <p className="font-bold text-primary mt-1">R$ {addon.price.toFixed(2).replace('.', ',')}</p>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => handleStartEditAddon(addon)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark">
                                                    <span className="material-symbols-outlined text-base">edit</span>
                                                </button>
                                                <button onClick={() => handleRemoveAddon(addon.id)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                                    <span className="material-symbols-outlined text-base">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                            <form onSubmit={handleAddAddon} className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark p-4">
                                <h3 className="text-base font-bold text-text-light dark:text-text-dark">Adicionar Novo Adicional</h3>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-addon-name">Nome</label>
                                    <input value={newAddonName} onChange={(e) => setNewAddonName(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-addon-name" placeholder="Ex: Farofa da Casa" type="text" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-addon-price">Preço</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">R$</span>
                                        <input value={newAddonPrice} onChange={(e) => setNewAddonPrice(e.target.value)} className="w-full pl-8 rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-addon-price" placeholder="4.00" type="number" step="0.01" required />
                                    </div>
                                </div>
                                <button type="submit" className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                                    <span className="material-symbols-outlined text-xl">add</span>
                                    <span className="truncate">Adicionar Adicional</span>
                                </button>
                            </form>
                        </div>
                    </details>


                    <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group" open>
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Itens Populares</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                         <div className="pt-2 pb-4 space-y-6">
                            <div className="space-y-4">
                                {popularItems.map(item => (
                                    editingItemId === item.id ? (
                                        <form key={item.id} onSubmit={handleSaveEdit} className="flex flex-col gap-4 rounded-lg border-2 border-primary p-4">
                                            <h3 className="text-base font-bold text-text-light dark:text-text-dark">Editando: {item.name}</h3>
                                             <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Imagem</label>
                                                <div className="flex items-center gap-3">
                                                    <img src={editItemData.image} alt="Preview" className="w-20 h-20 object-cover rounded-md"/>
                                                    <label htmlFor={`edit-image-${item.id}`} className="flex-1 cursor-pointer text-center py-2 px-4 bg-primary/10 text-primary rounded-md text-sm font-semibold">Escolher Imagem</label>
                                                    <input id={`edit-image-${item.id}`} type="file" accept="image/*" className="sr-only" onChange={handleEditItemImageChange} ref={editItemImageInputRef} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-name-${item.id}`}>Nome</label>
                                                <input value={editItemData.name} onChange={(e) => handleEditChange('name', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-name-${item.id}`} type="text" required/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-desc-${item.id}`}>Descrição</label>
                                                <textarea value={editItemData.description} onChange={(e) => handleEditChange('description', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-desc-${item.id}`} rows={3}></textarea>
                                            </div>
                                             <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-price-${item.id}`}>Preço (Ex: 12.90)</label>
                                                <input value={editItemData.price} onChange={(e) => handleEditChange('price', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-price-${item.id}`} type="text" required/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Adicionais Disponíveis</label>
                                                <div className="space-y-2 max-h-32 overflow-y-auto rounded-md border border-border-light dark:border-border-dark p-2">
                                                    {addons.map(addon => (
                                                        <label key={addon.id} className="flex items-center">
                                                            <input type="checkbox" checked={editItemData.addonIds?.includes(addon.id)} onChange={() => handleEditItemAddonsChange(addon.id)} className="h-4 w-4 rounded text-primary focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark" />
                                                            <span className="ml-2 text-sm text-text-light dark:text-text-dark">{addon.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button type="button" onClick={handleCancelEdit} className="flex items-center justify-center rounded-lg h-9 px-4 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-xs font-bold leading-normal">Cancelar</button>
                                                <button type="submit" className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-xs font-bold leading-normal">Salvar Alterações</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div 
                                            key={item.id}
                                            className={`flex flex-col gap-3 rounded-lg border border-border-light dark:border-border-dark p-3 transition-opacity ${draggedItem && draggedItem.id === item.id ? 'opacity-50' : 'opacity-100'}`}
                                            draggable
                                            onDragStart={(e) => onDragStartItem(e, item)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => onDropItem(e, item)}
                                            onDragEnd={() => setDraggedItem(null)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="material-symbols-outlined cursor-grab text-gray-400 dark:text-gray-500 pt-1">drag_indicator</span>
                                                <div className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-md flex-shrink-0" style={{ backgroundImage: `url("${item.image}")` }}></div>
                                                <div className="flex-grow">
                                                    <p className="font-bold text-text-light dark:text-text-dark">{item.name}</p>
                                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">{item.description}</p>
                                                    <p className="font-bold text-primary mt-1">R$ {item.price.replace('.', ',')}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => handleStartEdit(item)} className="flex items-center justify-center rounded-lg h-9 px-3 bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark gap-1.5 text-xs font-bold leading-normal">
                                                    <span className="material-symbols-outlined text-base">edit</span>
                                                    <span>Editar</span>
                                                </button>
                                                <button onClick={() => handleRemoveItem(item.id)} className="flex items-center justify-center rounded-lg h-9 px-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 gap-1.5 text-xs font-bold leading-normal">
                                                    <span className="material-symbols-outlined text-base">delete</span>
                                                    <span>Remover</span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>

                             <form onSubmit={handleAddItem} className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark p-4">
                                <h3 className="text-base font-bold text-text-light dark:text-text-dark">Adicionar Novo Item Popular</h3>
                                 <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Imagem</label>
                                    <div className="flex items-center gap-3">
                                        {newItemImage ? <img src={newItemImage} alt="Preview" className="w-20 h-20 object-cover rounded-md"/> : <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-400"><span className="material-symbols-outlined">image</span></div>}
                                        <label htmlFor="add-new-item-image" className="flex-1 cursor-pointer text-center py-2 px-4 bg-primary/10 text-primary rounded-md text-sm font-semibold">Escolher Imagem</label>
                                        <input id="add-new-item-image" type="file" accept="image/*" className="sr-only" onChange={handleAddNewItemImageChange} ref={newItemImageInputRef}/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-item-name">Nome</label>
                                    <input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-item-name" placeholder="Ex: Espetinho de Frango" type="text" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-item-description">Descrição</label>
                                    <textarea value={newItemDesc} onChange={(e) => setNewItemDesc(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-item-description" placeholder="Ex: Suculentos pedaços de frango..." rows={3}></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-item-price">Preço (Ex: 12.90)</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">R$</span>
                                        <input value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} className="w-full pl-8 rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-item-price" placeholder="0.00" type="text" required/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Adicionais Disponíveis</label>
                                    <div className="space-y-2 max-h-32 overflow-y-auto rounded-md border border-border-light dark:border-border-dark p-2">
                                        {addons.map(addon => (
                                            <label key={addon.id} className="flex items-center">
                                                <input type="checkbox" checked={newItemAddonIds.includes(addon.id)} onChange={() => handleNewItemAddonsChange(addon.id)} className="h-4 w-4 rounded text-primary focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark" />
                                                <span className="ml-2 text-sm text-text-light dark:text-text-dark">{addon.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                                    <span className="material-symbols-outlined text-xl">add</span>
                                    <span className="truncate">Adicionar Novo Item</span>
                                </button>
                            </form>
                        </div>
                    </details>
                    <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Queridinhos</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                        <div className="pt-2 pb-4 space-y-6">
                            <div className="space-y-4">
                                {favoriteItems.map(item => (
                                    editingFavItemId === item.id ? (
                                        <form key={item.id} onSubmit={handleSaveEditFav} className="flex flex-col gap-4 rounded-lg border-2 border-primary p-4">
                                            <h3 className="text-base font-bold text-text-light dark:text-text-dark">Editando: {item.name}</h3>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Imagem</label>
                                                <div className="flex items-center gap-3">
                                                    <img src={editFavItemData.image} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                                                    <label htmlFor={`edit-fav-image-${item.id}`} className="flex-1 cursor-pointer text-center py-2 px-4 bg-primary/10 text-primary rounded-md text-sm font-semibold">Escolher Imagem</label>
                                                    <input id={`edit-fav-image-${item.id}`} type="file" accept="image/*" className="sr-only" onChange={handleEditFavItemImageChange} ref={editFavItemImageInputRef} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-fav-name-${item.id}`}>Nome</label>
                                                <input value={editFavItemData.name} onChange={(e) => handleEditFavChange('name', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-fav-name-${item.id}`} type="text" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-fav-desc-${item.id}`}>Descrição</label>
                                                <textarea value={editFavItemData.description} onChange={(e) => handleEditFavChange('description', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-fav-desc-${item.id}`} rows={3}></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-fav-price-${item.id}`}>Preço (Ex: 10.90)</label>
                                                <input value={editFavItemData.price} onChange={(e) => handleEditFavChange('price', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-fav-price-${item.id}`} type="text" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Adicionais Disponíveis</label>
                                                <div className="space-y-2 max-h-32 overflow-y-auto rounded-md border border-border-light dark:border-border-dark p-2">
                                                    {addons.map(addon => (
                                                        <label key={addon.id} className="flex items-center">
                                                            <input type="checkbox" checked={editFavItemData.addonIds?.includes(addon.id)} onChange={() => handleEditFavItemAddonsChange(addon.id)} className="h-4 w-4 rounded text-primary focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark" />
                                                            <span className="ml-2 text-sm text-text-light dark:text-text-dark">{addon.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button type="button" onClick={handleCancelEditFav} className="flex items-center justify-center rounded-lg h-9 px-4 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-xs font-bold leading-normal">Cancelar</button>
                                                <button type="submit" className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-xs font-bold leading-normal">Salvar Alterações</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div key={item.id} className={`flex flex-col gap-3 rounded-lg border border-border-light dark:border-border-dark p-3 transition-opacity ${draggedFavItem && draggedFavItem.id === item.id ? 'opacity-50' : 'opacity-100'}`} draggable onDragStart={(e) => onDragStartFavItem(e, item)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropFavItem(e, item)} onDragEnd={() => setDraggedFavItem(null)}>
                                            <div className="flex items-start gap-3">
                                                <span className="material-symbols-outlined cursor-grab text-gray-400 dark:text-gray-500 pt-1">drag_indicator</span>
                                                <div className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-md flex-shrink-0" style={{ backgroundImage: `url("${item.image}")` }}></div>
                                                <div className="flex-grow">
                                                    <p className="font-bold text-text-light dark:text-text-dark">{item.name}</p>
                                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">{item.description}</p>
                                                    <p className="font-bold text-primary mt-1">R$ {item.price.replace('.', ',')}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => handleStartEditFav(item)} className="flex items-center justify-center rounded-lg h-9 px-3 bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark gap-1.5 text-xs font-bold leading-normal">
                                                    <span className="material-symbols-outlined text-base">edit</span>
                                                    <span>Editar</span>
                                                </button>
                                                <button onClick={() => handleRemoveFavItem(item.id)} className="flex items-center justify-center rounded-lg h-9 px-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 gap-1.5 text-xs font-bold leading-normal">
                                                    <span className="material-symbols-outlined text-base">delete</span>
                                                    <span>Remover</span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                            <form onSubmit={handleAddFavItem} className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark p-4">
                                <h3 className="text-base font-bold text-text-light dark:text-text-dark">Adicionar Novo Queridinho</h3>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Imagem</label>
                                    <div className="flex items-center gap-3">
                                        {newFavItemImage ? <img src={newFavItemImage} alt="Preview" className="w-20 h-20 object-cover rounded-md" /> : <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-400"><span className="material-symbols-outlined">image</span></div>}
                                        <label htmlFor="add-new-fav-item-image" className="flex-1 cursor-pointer text-center py-2 px-4 bg-primary/10 text-primary rounded-md text-sm font-semibold">Escolher Imagem</label>
                                        <input id="add-new-fav-item-image" type="file" accept="image/*" className="sr-only" onChange={handleAddNewFavItemImageChange} ref={newFavItemImageInputRef} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-fav-item-name">Nome</label>
                                    <input value={newFavItemName} onChange={(e) => setNewFavItemName(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-fav-item-name" placeholder="Ex: Queijo Coalho" type="text" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-fav-item-description">Descrição</label>
                                    <textarea value={newFavItemDesc} onChange={(e) => setNewFavItemDesc(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-fav-item-description" placeholder="Ex: Com um toque de melaço de cana" rows={3}></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-fav-item-price">Preço (Ex: 10.90)</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">R$</span>
                                        <input value={newFavItemPrice} onChange={(e) => setNewFavItemPrice(e.target.value)} className="w-full pl-8 rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-fav-item-price" placeholder="0.00" type="text" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Adicionais Disponíveis</label>
                                    <div className="space-y-2 max-h-32 overflow-y-auto rounded-md border border-border-light dark:border-border-dark p-2">
                                        {addons.map(addon => (
                                            <label key={addon.id} className="flex items-center">
                                                <input type="checkbox" checked={newFavItemAddonIds.includes(addon.id)} onChange={() => handleNewFavItemAddonsChange(addon.id)} className="h-4 w-4 rounded text-primary focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark" />
                                                <span className="ml-2 text-sm text-text-light dark:text-text-dark">{addon.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                                    <span className="material-symbols-outlined text-xl">add</span>
                                    <span className="truncate">Adicionar Novo Queridinho</span>
                                </button>
                            </form>
                        </div>
                    </details>
                     <div className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px]">
                        <div className="flex cursor-pointer items-center justify-between gap-6 py-2" onClick={onNavigateToManageMenu} role="button" tabIndex={0}>
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Gerenciar Cardápio</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark text-2xl">chevron_right</span>
                        </div>
                    </div>
                     <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Editar Categorias</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                         <div className="pt-2 pb-4 space-y-4">
                            <div className="space-y-4">
                                {categories.map(cat => (
                                    editingCategoryId === cat.id ? (
                                        <form key={cat.id} onSubmit={handleSaveEditCategory} className="flex flex-col gap-4 rounded-lg border-2 border-primary p-4">
                                            <h3 className="text-base font-bold text-text-light dark:text-text-dark">Editando: {cat.name}</h3>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-cat-name-${cat.id}`}>Nome da Categoria</label>
                                                <input value={editCategoryData.name} onChange={(e) => handleEditCategoryChange('name', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-cat-name-${cat.id}`} type="text" required/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-cat-icon-${cat.id}`}>Ícone (Material Symbols)</label>
                                                <input value={editCategoryData.icon} onChange={(e) => handleEditCategoryChange('icon', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-cat-icon-${cat.id}`} type="text" placeholder="Ex: local_bar" required/>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button type="button" onClick={handleCancelEditCategory} className="flex items-center justify-center rounded-lg h-9 px-4 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-xs font-bold leading-normal">Cancelar</button>
                                                <button type="submit" className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-xs font-bold leading-normal">Salvar Alterações</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div 
                                            key={cat.id}
                                            className={`flex items-center gap-3 rounded-lg border border-border-light dark:border-border-dark p-3 transition-opacity ${draggedCategory && draggedCategory.id === cat.id ? 'opacity-50' : ''}`}
                                            draggable
                                            onDragStart={(e) => onDragStartCategory(e, cat)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => onDropCategory(e, cat)}
                                            onDragEnd={() => setDraggedCategory(null)}
                                        >
                                            <span className="material-symbols-outlined cursor-grab text-gray-400 dark:text-gray-500">drag_indicator</span>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                                                <span className="material-symbols-outlined text-2xl text-primary">{cat.icon}</span>
                                            </div>
                                            <p className="flex-grow font-semibold text-text-light dark:text-text-dark">{cat.name}</p>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleStartEditCategory(cat)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark">
                                                    <span className="material-symbols-outlined text-base">edit</span>
                                                </button>
                                                <button onClick={() => handleRemoveCategory(cat.id)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                                    <span className="material-symbols-outlined text-base">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                             <form onSubmit={handleAddCategory} className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark p-4 mt-4">
                                <h3 className="text-base font-bold text-text-light dark:text-text-dark">Adicionar Nova Categoria</h3>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-category-name">Nome da Categoria</label>
                                    <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-category-name" placeholder="Ex: Sobremesas" type="text" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-category-icon">Ícone (Material Symbols)</label>
                                    <input value={newCategoryIcon} onChange={(e) => setNewCategoryIcon(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-category-icon" placeholder="Ex: icecream" type="text" required/>
                                </div>
                                <button type="submit" className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                                    <span className="material-symbols-outlined text-xl">add</span>
                                    <span className="truncate">Adicionar Nova Categoria</span>
                                </button>
                            </form>
                         </div>
                    </details>
                    <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Editar Menu Hambúrguer</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                         <div className="pt-2 pb-4 space-y-4">
                            <div className="space-y-4">
                                {sideMenuItems.map(item => (
                                    editingSideMenuItemId === item.id ? (
                                        <form key={item.id} onSubmit={handleSaveEditSideMenuItem} className="flex flex-col gap-4 rounded-lg border-2 border-primary p-4">
                                            <h3 className="text-base font-bold text-text-light dark:text-text-dark">Editando: {item.label}</h3>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-side-item-label-${item.id}`}>Rótulo</label>
                                                <input value={editSideMenuItemData.label} onChange={(e) => handleEditSideMenuItemChange('label', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-side-item-label-${item.id}`} type="text" required/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor={`edit-side-item-icon-${item.id}`}>Ícone (Material Symbols)</label>
                                                <input value={editSideMenuItemData.icon} onChange={(e) => handleEditSideMenuItemChange('icon', e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id={`edit-side-item-icon-${item.id}`} type="text" placeholder="Ex: person" required/>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button type="button" onClick={handleCancelEditSideMenuItem} className="flex items-center justify-center rounded-lg h-9 px-4 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-xs font-bold leading-normal">Cancelar</button>
                                                <button type="submit" className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-xs font-bold leading-normal">Salvar Alterações</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div 
                                            key={item.id}
                                            className={`flex items-center gap-3 rounded-lg border border-border-light dark:border-border-dark p-3 transition-opacity ${draggedSideMenuItem && draggedSideMenuItem.id === item.id ? 'opacity-50' : ''}`}
                                            draggable
                                            onDragStart={(e) => onDragStartSideMenuItem(e, item)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => onDropSideMenuItem(e, item)}
                                            onDragEnd={() => setDraggedSideMenuItem(null)}
                                        >
                                            <span className="material-symbols-outlined cursor-grab text-gray-400 dark:text-gray-500">drag_indicator</span>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                                                <span className="material-symbols-outlined text-2xl text-primary">{item.icon}</span>
                                            </div>
                                            <p className="flex-grow font-semibold text-text-light dark:text-text-dark">{item.label}</p>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleStartEditSideMenuItem(item)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark">
                                                    <span className="material-symbols-outlined text-base">edit</span>
                                                </button>
                                                <button onClick={() => handleRemoveSideMenuItem(item.id)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                                    <span className="material-symbols-outlined text-base">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                             <form onSubmit={handleAddSideMenuItem} className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark p-4 mt-4">
                                <h3 className="text-base font-bold text-text-light dark:text-text-dark">Adicionar Novo Item ao Menu</h3>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-side-item-label">Rótulo</label>
                                    <input value={newSideMenuItemLabel} onChange={(e) => setNewSideMenuItemLabel(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-side-item-label" placeholder="Ex: Ajuda" type="text" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="new-side-item-icon">Ícone (Material Symbols)</label>
                                    <input value={newSideMenuItemIcon} onChange={(e) => setNewSideMenuItemIcon(e.target.value)} className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark" id="new-side-item-icon" placeholder="Ex: help" type="text" required/>
                                </div>
                                <button type="submit" className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                                    <span className="material-symbols-outlined text-xl">add</span>
                                    <span className="truncate">Adicionar Novo Item</span>
                                </button>
                            </form>
                         </div>
                    </details>
                    <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Compartilhe seu Aplicativo</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                         <div className="pt-2 pb-4 space-y-4">
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                Use este link para compartilhar seu aplicativo com clientes. Ele oculta o painel de controle, fornecendo uma visualização apenas para pedidos.
                            </p>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    readOnly
                                    value={publicUrl}
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark pr-28 focus:ring-primary focus:border-primary text-text-light dark:text-text-dark text-sm"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-md h-8 px-3 bg-primary text-white text-xs font-bold transition-colors hover:bg-primary/90"
                                >
                                    {copyStatus}
                                </button>
                            </div>
                         </div>
                    </details>
                     <details className="flex flex-col rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-[15px] py-[7px] group">
                        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                            <p className="text-base font-bold text-text-light dark:text-text-dark">Aparência do App</p>
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform text-2xl">expand_more</span>
                        </summary>
                         <div className="pt-2 pb-4 space-y-4">
                           <div>
                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2" htmlFor="primary-color">
                                    Cor Primária
                                </label>
                                <div className="flex items-center gap-4">
                                   <div className="relative p-1 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark">
                                     <input
                                        id="primary-color"
                                        type="color"
                                        value={themeSettings.primaryColor}
                                        onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                                        className="p-0 h-10 w-10 border-none rounded-md cursor-pointer bg-transparent"
                                        style={{'WebkitAppearance': 'none', 'MozAppearance': 'none', 'appearance': 'none'}}
                                    />
                                   </div>
                                    <span className="font-mono text-sm text-text-secondary-light dark:text-text-secondary-dark">{themeSettings.primaryColor.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="dark-mode-toggle">
                                    Modo Escuro
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="dark-mode-toggle"
                                        checked={themeSettings.darkMode}
                                        onChange={(e) => setThemeSettings(prev => ({ ...prev, darkMode: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </label>
                            </div>
                         </div>
                    </details>
                </div>
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent p-4">
                <button className="flex w-full items-center justify-center rounded-xl h-12 px-6 bg-primary text-white font-bold text-base leading-normal tracking-wide shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark">
                    Salvar Alterações
                </button>
            </footer>
        </div>
    );
};

export default AdminPanel;