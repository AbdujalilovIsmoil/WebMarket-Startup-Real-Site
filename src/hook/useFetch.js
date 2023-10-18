import { axios } from "services";

const useFetch = {
  useGet: async ({ api, token }) => {
    return await axios
      .get(api, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      })
      .then((response) => response);
  },
  useDelete: async ({ api, token }) => {
    return await axios
      .delete(api, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      })
      .then((response) => response);
  },
  usePost: async ({ api, token, values }) => {
    return await axios.post(api, values, {
      headers: {
        "Content-Type": "application/json",
        token: token ? token : "",
      },
    });
  },
  usePostUpload: async ({ values }) => {
    return await axios.post(
      "https://api.cloudinary.com/v1_1/roadsidecoder/image/upload",
      values
    );
  },
  usePut: async ({ values, api, token }) => {
    return axios.put(api, values, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
  },
};

export default useFetch;
