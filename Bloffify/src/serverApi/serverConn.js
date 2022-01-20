import axios from "axios";

const port = 3001;
const storage = localStorage.getItem("bluffifyUser");
console.log(storage);
const TOKEN = `bearer ${storage}`;

const instance = axios.create({
  baseURL: `http://localhost:${port}/`,
});

if (storage) {
  instance.defaults.headers.common["Authorization"] = TOKEN;
}

export default instance;
