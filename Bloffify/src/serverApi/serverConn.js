import axios from "axios";
import env from "dotenv";
env.config();

// const port = 3001;
const storage = localStorage.getItem("bluffifyUser");
const TOKEN = `bearer ${storage}`;

const instance = axios.create({
  // baseURL: `http://localhost:${port}/`,
  baseURL: `${process.env.BASE_URL}`,
});

if (storage) {
  instance.defaults.headers.common["Authorization"] = TOKEN;
}

export default instance;
