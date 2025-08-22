import React, { useState } from "react";
import "./Registerwithlogin.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Login Successful");
        navigate(`/dashboard/${formData.username}`);
      } else {
        alert(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Server Error, please try again later");
    }
  };

  return (
    <div className="Register">
      <div className="container-Register-login">
        <div className="row-register-login">
          <div className="box-register-login">
            <div className="box-form-register-login">
            <div className="top-text-server">
              <h2>LogIn Now!</h2>
            </div>
              <form onSubmit={handleSubmit} className="My-form-login-register">
                <label>Username:</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />

                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />

                <label>Password:</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />

                <input type="submit" value="Login" className="MyBtns-server" />
              </form>

              <div className="If-you-dont-have-account-click-here">
                <Link to="/register">
                  <span>
                    Don’t have an account? <mark>Register</mark>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
