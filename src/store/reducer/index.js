import { initialState } from "../initialState";
import {
  LOADER,
  USERNAME,
  ABOUT_DATA,
  OPEN_NAVBAR,
  CLOSE_NAVBAR,
  PRODUCT_DATA,
  CHANGE_INPUT,
  GET_PRODUCTS,
  GET_TECHNOLOGIES,
} from "../type";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NAVBAR:
      return {
        ...state,
        navbar: true,
      };
    case CLOSE_NAVBAR:
      return {
        ...state,
        navbar: false,
      };
    case PRODUCT_DATA:
      return {
        ...state,
        products: action.payload,
      };
    case LOADER:
      return {
        ...state,
        loader: false,
      };
    case CHANGE_INPUT:
      return {
        ...state,
        searchValue: action.payload,
      };
    case GET_TECHNOLOGIES:
      return {
        ...state,
        technologies: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        get_products: action.payload,
      };
    case USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case ABOUT_DATA:
      return {
        ...state,
        about_data: action.payload,
      };
    default:
      return state;
  }
};
