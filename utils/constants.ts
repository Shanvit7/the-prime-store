// ASSETS
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

// API-BASED 
export const ALL_PRODUCTS_API = '/api/all-products';
export const PRODUCT_API = '/api/product';

// UI BASED
export const TOPBAR_TABS = [
    { text: "Products", route: "/shop/products", Icon: ShoppingBagIcon },
    { text: "Cart", route: "/shop/cart", Icon: ShoppingCartIcon },
];