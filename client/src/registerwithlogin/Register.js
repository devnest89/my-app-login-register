// Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registerwithlogin.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    file: null,
    range: "",
    order: "",
    select: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("range", formData.range);
      formDataToSend.append("order", Number(formData.order) || 0);
      formDataToSend.append("select", formData.select);

      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Registration Successful 🎉");
        navigate(`/dashboard/${formData.username}`);
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server Error, please try again later ⚠️");
    }
  };

  return (
    <div className="Register">
      <div className="container-Register-login">
        <div className="row-register-login">
          <div className="box-register-login">
            <div className="box-form-register-login">
              <form
                method="post"
                className="My-form-login-register"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
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

                <label>Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, file: e.target.files[0] })
                  }
                  required
                />

                <label>Range:</label>
                <input
                  type="range"
                  value={formData.range}
                  onChange={(e) =>
                    setFormData({ ...formData, range: e.target.value })
                  }
                />

                <label>Order:</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: e.target.value })
                  }
                />

                <label>Select:</label>
                <select
                  value={formData.select}
                  onChange={(e) =>
                    setFormData({ ...formData, select: e.target.value })
                  }
                >
                  <option value={""}>Select one</option>
                  <option value={"book"}>Book</option>
                  <option value={"electronic"}>Electronic</option>
                  <option value={"health"}>Health</option>
                  <option value={"car"}>Car</option>
                  <option value={"house"}>House</option>
                  <option value={"person"}>Person</option>
                </select>

                <input type="submit" value="Submit" className="MyBtns-server"/>
              </form>

              <div className="If-you-dont-have-account-click-here">
                <Link to="/">
                  <span>
                    Have an account? <mark>Login</mark>
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

export default Register;
