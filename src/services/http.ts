import axios from "axios";

const http = axios.create({
    baseURL: "https://dummyjson.com/",
});

export default {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
};
