import React, { useState } from "react";
import { Link } from "react-router-dom";
import templogo from "../images/templogo.png";
import axios from "axios";

const Nav = (props) => {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", { value, password })
      .then((res) => {
        props.loginUser(res.data);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div>
      <Link to="/">
        <img
          className="app-logo"
          src={templogo}
          alt="WordHunch logo"
          style={{ width: "120px" }}
        />
      </Link>
      <div className="not-loggedin">
        <form onSubmit={(e) => login(e)}>
          <input
            className="login-input"
            type="text"
            placeholder="username or email"
            value={value}
            onChange={(e, v) => setValue(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e, v) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/auth">Register</Link>
        
      </div>
      <div className="logged-in">
        <Link to="/profile">Profile</Link>
        <button>About</button>
      </div>
    </div>
  );
};

export default Nav;
