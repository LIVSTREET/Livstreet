import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, storefrontApiRequest, CART_CREATE_MUTATION } from '@/lib/shopify';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  lineItemProperties?: Record<string, string>;
}

export interface InquiryFormData {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
}

export interface DesignImageData {
  imageBase64: string;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  shouldOpenDrawer: boolean;
  shouldOpenInquiryForm: boolean;
  inquiryFormData: InquiryFormData | null;
  designImageData: DesignImageData | null;
  
  // Actions
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<string | null>;
  openDrawer: () => void;
  closeDrawer: () => void;
  openInquiryForm: () => void;
  closeInquiryForm: () => void;
  setInquiryFormData: (data: InquiryFormData | null) => void;
  clearInquiryFormData: () => void;
  setDesignImageData: (data: DesignImageData | null) => void;
  clearDesignImageData: () => void;
}

async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  const lines = items.map(item => {
    const lineItem: { quantity: number; merchandiseId: string; attributes?: Array<{ key: string; value: string }> } = {
      quantity: item.quantity,
      merchandiseId: item.variantId,
    };
    
    // Add custom line item properties if present
    if (item.lineItemProperties) {
      lineItem.attributes = Object.entries(item.lineItemProperties).map(([key, value]) => ({
        key,
        value,
      }));
    }
    
    return lineItem;
  });

  const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines },
  });

  if (!cartData) {
    throw new Error('Failed to create cart');
  }

  if (cartData.data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  const cart = cartData.data.cartCreate.cart;
  
  if (!cart.checkoutUrl) {
    throw new Error('No checkout URL returned from Shopify');
  }

  const url = new URL(cart.checkoutUrl);
  url.searchParams.set('channel', 'online_store');
  return url.toString();
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      shouldOpenDrawer: false,
      shouldOpenInquiryForm: false,
      inquiryFormData: null,
      designImageData: null,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),
      openDrawer: () => set({ shouldOpenDrawer: true }),
      closeDrawer: () => set({ shouldOpenDrawer: false }),
      openInquiryForm: () => set({ shouldOpenInquiryForm: true }),
      closeInquiryForm: () => set({ shouldOpenInquiryForm: false }),
      setInquiryFormData: (data) => set({ inquiryFormData: data }),
      clearInquiryFormData: () => set({ inquiryFormData: null }),
      setDesignImageData: (data) => set({ designImageData: data }),
      clearDesignImageData: () => set({ designImageData: null }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return null;

        setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(items);
          setCheckoutUrl(checkoutUrl);
          return checkoutUrl;
        } catch (error) {
          console.error('Failed to create checkout:', error);
          return null;
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'livstreet-cart',
      storage: createJSONStorage(() => localStorage),
      // Don't persist designImageData - it's too large for localStorage
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
        inquiryFormData: state.inquiryFormData,
        // Exclude: designImageData, isLoading, shouldOpenDrawer, shouldOpenInquiryForm
      }),
    }
  )
);
