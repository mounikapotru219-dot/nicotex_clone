import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null,
            isAuthenticated: false,
            login: (userData, token) => {
                set({ user: userData, token, isAuthenticated: true });
                localStorage.setItem('admin_token', token);
            },
            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
                localStorage.removeItem('admin_token');
            },
        }),
        {
            name: 'auth-storage',
        }
    )
)

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1) => {
                const items = get().items;
                const existingItem = items.find((i) => i._id === product._id);
                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i._id === product._id ? { ...i, quantity: i.quantity + quantity } : i
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity }] });
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i._id !== productId) });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity < 1) return;
                set({
                    items: get().items.map((i) =>
                        i._id === productId ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
)

export const useUIStore = create((set) => ({
    isCartOpen: false,
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    isMobileMenuOpen: false,
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}))
