import API from "./api";

export type Product = {
  id: string;
  tipo: "carne" | "huevo" | "miel";
  procedencia?: string;
  peso?: number | null;
  fechaSacrificio?: string | null;
  fechaCaducidad?: string | null;
  cantidadHuevos?: number | null;
  fechaRecoleccionHuevos?: string | null;
  cantidadMiel?: number | null;
  fechaExtraccionMiel?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export const productService = {
  list: async () => {
    const r = await API.get("/products");
    return r.data;
  },
  get: async (id: string) => {
    const r = await API.get(`/products/${id}`);
    return r.data;
  },
  create: async (payload: ProductInput) => {
    const r = await API.post("/products", payload);
    return r.data;
  },
  update: async (id: string, payload: ProductInput) => {
    const r = await API.put(`/products/${id}`, payload);
    return r.data;
  },
  remove: async (id: string) => {
    const r = await API.delete(`/products/${id}`);
    return r.data;
  }
};
