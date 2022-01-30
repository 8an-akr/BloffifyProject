import axios from "axios";

const port = 3001;
const storage = localStorage.getItem("accToken");
const TOKEN = `bearer ${storage}`;

const api = axios.create({
  baseURL: `http://localhost:${port}/`,
});

if (storage) {
  api.defaults.headers.common["Authorization"] = TOKEN;
}

export default api;
