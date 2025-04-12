import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // 🚀 Add this

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log(response.data);
      setMsg(response.data);
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setMsg(error.response?.data || "Login Failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="heading">Login In</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="E-mail"
            id="email"
            name="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="forgot-password">
            <button type="button" className="link-button">
              Forgot Password?
            </button>
          </span>
          <input value="Login In" type="submit" className="login-button" />
        </form>

        {msg && (
          <p
            style={{
              textAlign: "center",
              color: msg === "Login Successfully" ? "green" : "red",
            }}
          >
            {msg}
          </p>
        )}

        {/* ⏩ This button navigates to SignInForm */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            type="button"
            className="login-button"
            onClick={() => navigate("/signin")}
          >
            Sign Up
          </button>
        </div>

        <span className="agreement">
          <button type="button" className="link-button">
            Learn user licence agreement
          </button>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
