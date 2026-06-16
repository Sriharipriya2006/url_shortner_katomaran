import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

    toast.success("Registration Successful");

setTimeout(() => {
  navigate("/");
}, 1500);
    //   toast.success("Registration Successful");

    } catch (error) {
      toast.error("Registration Failed ");
    }
  };

return (
  <div className="auth-container">
    <div className="auth-card">
      <h2 className="auth-title">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>
      </form>
    </div>
  </div>
);
}

export default Register;