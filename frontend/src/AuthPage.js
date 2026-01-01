import React, { useState } from "react";
import axios from "axios";
import "./AuthPage.css";

function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin
        ? "http://localhost:4000/api/auth/login"
        : "http://localhost:4000/api/auth/signup";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(url, payload);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        onLoginSuccess();
      } else {
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <p className="subtitle">
          Smart Disease Predictor
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "New user? Create an account"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
