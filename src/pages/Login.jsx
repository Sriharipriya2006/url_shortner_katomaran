import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful ");

      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed ");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-3">
        Don't have an account?{" "}
        <span
          style={{
            color: "blue",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  </div>
);
}

export default Login;