import API from "./api";

export const productsService = {
  list: async () => (await API.get("/products")).data,
  get: async (id: string) => (await API.get(`/products/${id}`)).data,
  create: async (payload: any) => (await API.post("/products", payload)).data,
  update: async (id: string, payload: any) => (await API.put(`/products/${id}`, payload)).data,
  remove: async (id: string) => (await API.delete(`/products/${id}`)).data
};