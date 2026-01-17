import API from "./api";

export type Animal = {
  id: string;
  especie: string;
  fechaIngreso: string | null;
  edad: string | null;
  peso: number | null;
  estado: "saludable" | "enfermo" | "vendido" | "muerto";
  cantidad: number;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const animalsService = {
  list: async () => {
    const r = await API.get("/animals");
    return r.data;
  },
  get: async (id: string) => {
    const r = await API.get(`/animals/${id}`);
    return r.data;
  },
  create: async (payload: any) => {
    const r = await API.post("/animals", payload);
    return r.data;
  },
  update: async (id: string, payload: any) => {
    const r = await API.put(`/animals/${id}`, payload);
    return r.data;
  },
  remove: async (id: string) => {
    const r = await API.delete(`/animals/${id}`);
    return r.data;
  }
};