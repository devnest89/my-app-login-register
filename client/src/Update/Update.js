import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Update.css";

function Update() {
  const { id } = useParams(); // user id
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    range: "",
    order: "",
    select: "",
    dateTime: "",
    file: null,
    oldFile: "",
  });

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8000/api/user/id/${id}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setForm({
          ...data.user,
          file: null,
          oldFile: data.user.file,
        });
      } else {
        alert(data.message);
      }
    };
    fetchUser();
  }, [id]);

  // Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("range", form.range);
    formData.append("order", form.order);
    formData.append("select", form.select);
    if (form.file) formData.append("file", form.file);

    const res = await fetch(`http://localhost:8000/api/user/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.success) {
      alert("User updated ✅");
      navigate(`/dashboard/${form.username}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="update">
      <form className="container-update" onSubmit={handleSubmit}>
        <div className="row-update">
          <div className="box-update">
            <div className="image-users-update">
              {form.oldFile && !form.file && (
                <img
                  src={`http://localhost:8000/uploads/${form.oldFile}`}
                  alt="current profile"
                  width="120"
                />
              )}
              <input type="file" onChange={handleFile} />
            </div>

            <div className="information-users-update">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <label>Range</label>
              <input
                type="text"
                name="range"
                value={form.range}
                onChange={handleChange}
              />
              <label>Order</label>
              <input
                type="text"
                name="order"
                value={form.order}
                onChange={handleChange}
              />
              <label>Select</label>
              <input
                type="text"
                name="select"
                value={form.select}
                onChange={handleChange}
              />
              <label>DateTime</label>
              <p>
                Registered on:{" "}
                <mark className="my-mark-main-user">
                  {form.dateTime
                    ? new Date(form.dateTime).toLocaleString()
                    : ""}
                </mark>
              </p>
            </div>

            <div className="myBTnss">
              <input type="submit" value={"Update"} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;
