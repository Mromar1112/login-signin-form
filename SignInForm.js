import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInForm.css"; // You can rename if desired

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (!response.ok) {
        alert(data); // e.g., "User already exists"
      } else {
        alert("User registered successfully!");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleRegister}>
        <p className="form-title">Register</p>

        <div className="input-container">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>
            {/* User Icon */}
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>
            {/* Eye Icon */}
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <button className="submit" type="submit">
          Register
        </button>

        <p className="signup-link">
          Already have an account?{" "}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate(-1)} // navigates to previous page
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
