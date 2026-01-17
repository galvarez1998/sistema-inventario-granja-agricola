import API from "./api";

export type Sale = {
  id: string;
  tipo: "producto" | "animal";
  referenciaId: string;
  precioTotal: number;
  cantidad: number;
  fecha: Date;
  notas?: string;
};

export type SaleInput = Omit<Sale, 'id'>;

export const salesService = {
  create: async (payload: SaleInput) => (await API.post("/sales", payload)).data,
  list: async () => (await API.get("/sales")).data,
  get: async (id: string) => (await API.get(`/sales/${id}`)).data,
  update: async (id: string, payload: SaleInput) => (await API.put(`/sales/${id}`, payload)).data,
  remove: async (id: string) => (await API.delete(`/sales/${id}`)).data
};