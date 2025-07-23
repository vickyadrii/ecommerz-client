import { create } from "zustand";
import type { Product } from "@/features/products/types";
import { api } from "@/configs/instance";

type ProductStore = {
  products: Product[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string;
  fetchProducts: () => Promise<void>;
  reset: () => void;
  addProduct: (payload: Omit<Product, "id">) => Promise<void>;
  editProduct: (sku: string, payload: Omit<Product, "id" | "sku">) => Promise<void>;
  deleteProduct: (sku: string) => Promise<void>;
};

const LIMIT = 8;

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: "",

  fetchProducts: async () => {
    const { page, products, hasMore, loading } = get();
    if (!hasMore || loading) return;

    try {
      set({ loading: true });

      const response = await api.get(`/products?page=${page}&limit=${LIMIT}`);
      const fetched = response.data.data as Product[];

      set({
        products: [...products, ...fetched],
        page: page + 1,
        hasMore: fetched.length === LIMIT,
        error: "",
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      set({ error: "Failed to load products." });
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (payload) => {
    try {
      await api.post("/products", payload);
      set({ products: [], page: 1 });
      await get().fetchProducts();
    } catch (e) {
      console.error("Failed to add product", e);
    }
  },
  editProduct: async (sku, payload) => {
    try {
      await api.put(`/products/${sku}`, payload);
      set({ products: [], page: 1 });
      await get().fetchProducts();
    } catch (e) {
      console.error(`Failed to edit product with SKU ${sku}`, e);
    }
  },
  deleteProduct: async (sku: string) => {
    try {
      await api.delete(`/products/${sku}`);
      set((state) => ({
        products: state.products.filter((p) => p.sku !== sku),
      }));
    } catch (e) {
      console.error("Failed to delete product", e);
    }
  },

  reset: () =>
    set({
      products: [],
      page: 1,
      hasMore: true,
      loading: false,
      error: "",
    }),
}));
