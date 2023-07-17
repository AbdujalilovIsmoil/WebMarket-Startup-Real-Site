import axios from 'axios';

const useFetch = {
    useGet: async ({ api, token }) => {
        return await axios.get(`https://startupwepapp.onrender.com/api${api}`, {
            headers: {
                "Content-Type": "application/json",
                token
            }
        }).then(response => response)
    },
    useDelete: async ({ api, token }) => {
        return await axios.delete(`https://startupwepapp.onrender.com/api${api}`, {
            headers: {
                "Content-Type": "application/json",
                token
            }
        }).then(response => response);
    },
    usePost: async ({ api, token, values }) => {
        return await axios.post(`https://startupwepapp.onrender.com/api${api}`, values, {
            headers: {
                "Content-Type": "application/json",
                token: token ? token : ""
            }
        })
    },
    usePostUpload: async ({ values }) => {
        return await axios.post("https://api.cloudinary.com/v1_1/roadsidecoder/image/upload", values,);
    },
    usePut: async ({ values, api, token }) => {
        return axios.put(`https://startupwepapp.onrender.com/api${api}`, values, {
            headers: {
                "Content-Type": "application/json",
                token
            }
        })
    }
};

export default useFetch;