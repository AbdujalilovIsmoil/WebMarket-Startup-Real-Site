export const OPEN_NAVBAR = () => {
  return {
    type: "OPEN_NAVBAR",
  };
};

export const CLOSE_NAVBAR = () => {
  return {
    type: "CLOSE_NAVBAR",
  };
};

export const PRODUCT_DATA = (data) => {
  return {
    type: "PRODUCT_DATA",
    payload: data,
  };
};

export const GET_PRODUCT = (data) => {
  return {
    type: "GET_PRODUCTS",
    payload: data,
  };
};

export const LOADER = () => {
  return {
    type: "LOADER",
  };
};

export const CHANGE_INPUT = (value) => {
  return {
    type: "CHANGE_INPUT",
    payload: value,
  };
};

export const GET_TECHNOLOGIES = (value) => {
  return {
    type: "GET_TECHNOLOGIES",
    payload: value,
  };
};

export const USERNAME = (value) => {
  return {
    type: "USERNAME",
    payload: value,
  };
};

export const ABOUT_DATA = (value) => {
  return {
    type: "ABOUT_DATA",
    payload: value,
  };
};
