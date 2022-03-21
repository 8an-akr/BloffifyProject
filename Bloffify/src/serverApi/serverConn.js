import axios from "axios";

// const port = 3001;
const storage = localStorage.getItem("bluffifyUser");
const TOKEN = `bearer ${storage}`;

const instance = axios.create({
  // baseURL: `http://localhost:${port}/`,
  baseURL: `${process.env.BASE_URL}`,
});

try {
  instance.defaults.headers.common["Authorization"] = TOKEN;
} catch (error) {
  console.log("No token");
}

export default instance;
