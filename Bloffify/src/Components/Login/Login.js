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
        setStorage(TOKEN);
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
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
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
