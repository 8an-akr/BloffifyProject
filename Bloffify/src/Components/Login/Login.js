import "./Login.css";
import { useState } from "react";
import api from "../../serverApi/serverConn";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/index";

function Login({ setStorage }) {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const dispatch = useDispatch();

  const loginUserDB = async ({ username, password }) => {
    const res = await api.post("/users/login", {
      username: username,
      password: password,
    });
    const TOKEN = res.data;
    return TOKEN;
  };

  const registerUserDB = async ({ username, password }) => {
    const res = await api.post("/users/register", { username, password });
    const user = res.data;
    return user;
  };

  const login = async () => {
    try {
      const { username, password } = {
        username: inputUsername,
        password: inputPassword,
      };
      if (username && password) {
        const TOKEN = await loginUserDB({ username, password });
        localStorage.setItem("bluffifyUser", TOKEN);
        const setToken = await localStorage.getItem("bluffifyUser");
        setStorage(setToken);
        dispatch()(loginAction());
      }
    } catch (err) {
      console.log(err, err.msg);
    }
  };

  const register = async () => {
    try {
      const { username, password } = {
        username: inputUsername,
        password: inputPassword,
      };
      if (username && password) {
        const user = await registerUserDB({ username, password });
        if (user) {
          login();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="logo">
        <img
          className="login__logo"
          src="https://i.pinimg.com/originals/f0/5c/bc/f05cbc8c0f8b075d2b4f1f68fee49649.jpg"
          alt="Bloffiy"
        />
        <h2 id="bloffify">Bloffify</h2>
      </div>
      <form>
        <input
          id="login-username"
          type="text"
          placeholder="Username"
          className="input"
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <input
          id="login-password"
          type="text"
          placeholder="Password"
          className="input"
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </form>
      <div onClick={() => login()} className="login-btn btn" to="/">
        LOGIN TO BLOFFIFY
      </div>
      <div onClick={() => register()} className="signup-btn btn" to="/">
        SIGN UP TO BLOFFIFY
      </div>
    </div>
  );
}

export default Login;
