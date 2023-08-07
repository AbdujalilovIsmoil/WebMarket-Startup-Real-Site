import { storage } from "../../services/storage";

export const initialState = {
  loader: true,
  products: [],
  username: storage.get("username") || "",
  navbar: false,
  searchValue: "",
  technologies: [],
  get_products: [],
  about_data: [],
};
