import API from "./api";

export type Production = {
  id: string;
  tipo: "huevos" | "miel" | "peso";
  fecha: string;
  cantidadHuevos?: number;
  cantidadMiel?: number;
  gananciaPeso?: number;
  referencia?: string;
};

export type ProductionInput = Omit<Production, 'id'>;

export const productionService = {
  async list(): Promise<Production[]> {
    const res = await API.get("/production");
    return res.data;
  },

  async get(id: string): Promise<Production> {
    const res = await API.get(`/production/${id}`);
    return res.data;
  },

  async create(data: ProductionInput): Promise<Production> {
    const res = await API.post("/production", data);
    return res.data;
  },

  async update(id: string, data: ProductionInput): Promise<Production> {
    const res = await API.put(`/production/${id}`, data);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await API.delete(`/production/${id}`);
  },
};
