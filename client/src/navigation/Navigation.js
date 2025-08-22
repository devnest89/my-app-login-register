// Navigation.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/user/${username}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
        } else {
          alert(data.message || "User not found ❌");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        alert("Server Error ⚠️");
      }
    };
    fetchUser();
  }, [username, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const res = await fetch(`http://localhost:8000/api/user/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("User deleted ✅");
        localStorage.removeItem("token"); // إزالة التوكن
        navigate("/"); // إعادة التوجيه لصفحة الدخول
      } else {
        alert(data.message || "Error deleting user");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // إزالة التوكن
    alert("Logged out successfully");
    navigate("/"); // إعادة التوجيه لصفحة الدخول
  };

  if (!user) return <div>Loading user data...</div>;

  return (
    <div className="navigation">
      <div className="container-navigation">
        <div className="row-navigation">
          <div className="box-two-navigation">
            <div className="images-users">
              <img
                src={`http://localhost:8000/uploads/${user.file}`}
                alt="profile"
                width="150"
              />
            </div>
            <div className="information-about-users">
              <h1>
                Welcome, <mark className="my-mark-main-user">{user.username}!</mark>
              </h1>
              <p>
                Email: <mark className="my-mark-main-user">{user.email}</mark>
              </p>
              <p>
                Range: <mark className="my-mark-main-user">{user.range}</mark>
              </p>
              <p>
                Order: <mark className="my-mark-main-user">{user.order}</mark>
              </p>
              <p>
                Select: <mark className="my-mark-main-user">{user.select}</mark>
              </p>
              <p>
                Registered on:{" "}
                <mark className="my-mark-main-user">
                  {new Date(user.dateTime).toLocaleString()}
                </mark>
              </p>
            </div>

            <div className="box-btns update">
              <Link to={`/update/${user._id}`}>
              <div className="box-btns update">
                <button>Update</button>
                </div>
              </Link>
            </div>

            <div className="box-btns Delete">
              <button onClick={handleDelete}>Delete</button>
            </div>

            <div className="box-btns logOUt">
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
