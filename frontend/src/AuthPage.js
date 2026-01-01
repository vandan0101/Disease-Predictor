import React, { useState } from "react";
import axios from "axios";

function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
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
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

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
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p style={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "New user? Create an account"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#e3f2fd"
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "350px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  },
  toggle: {
    marginTop: "15px",
    color: "#1976d2",
    cursor: "pointer"
  }
};

export default AuthPage;
