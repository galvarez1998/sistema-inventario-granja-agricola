import API from "./api";

export const salesService = {
  create: async (payload: any) => (await API.post("/sales", payload)).data,
  list: async () => (await API.get("/sales")).data
};