import API from "./api";

export type Movement = {
  id: string;
  tipo: "nacimiento" | "muerte" | "venta" | "compra";
  especie: string;
  cantidad: number;
  notas?: string;
  fecha: string;
};

export type MovementInput = Omit<Movement, 'id'>;

export const movementsService = {
  async list(): Promise<Movement[]> {
    const res = await API.get("/movements");
    return res.data;
  },

  async get(id: string): Promise<Movement> {
    const res = await API.get(`/movements/${id}`);
    return res.data;
  },

  async create(data: MovementInput): Promise<Movement> {
    const res = await API.post("/movements", data);
    return res.data;
  },

  async update(id: string, data: MovementInput): Promise<Movement> {
    const res = await API.put(`/movements/${id}`, data);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await API.delete(`/movements/${id}`);
  },
};
