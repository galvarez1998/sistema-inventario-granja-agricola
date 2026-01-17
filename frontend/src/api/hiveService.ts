import API from "./api";

export type Hive = {
  id: string;
  nombre: string;
  ultimaProduccionLitros: number;
  ubicacion?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type HiveInput = Omit<Hive, 'id' | 'createdAt' | 'updatedAt'>;

export const hiveService = {
  list: async () => {
    const r = await API.get("/hives");
    return r.data;
  },
  get: async (id: string) => {
    const r = await API.get(`/hives/${id}`);
    return r.data;
  },
  create: async (payload: HiveInput) => {
    const r = await API.post("/hives", payload);
    return r.data;
  },
  update: async (id: string, payload: HiveInput) => {
    const r = await API.put(`/hives/${id}`, payload);
    return r.data;
  },
  remove: async (id: string) => {
    const r = await API.delete(`/hives/${id}`);
    return r.data;
  }
};
