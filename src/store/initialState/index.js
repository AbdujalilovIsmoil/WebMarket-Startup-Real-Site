import { storage } from "services/storage";

export const initialState = {
  loader: true,
  products: [],
  navbar: false,
  about_data: [],
  searchValue: "",
  technologies: [],
  get_products: [],
  username: storage.get("username") || "",
};
