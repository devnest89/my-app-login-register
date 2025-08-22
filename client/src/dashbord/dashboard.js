// // Dashboard.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Navigation from "../navigation/Navigation";
function Dashboard() {
  // const { username } = useParams();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:8000/api/user/${username}`);
  //       const data = await res.json();
  //       if (res.ok && data.success) {
  //         setUser(data.user);
  //       } else {
  //         alert(data.message || "User not found ❌");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       alert("Server Error ⚠️");
  //     }
  //   };
  //   fetchUser();
  // }, [username]);

  // if (!user) return <div>Loading user data...</div>;

  return (
    // <div>
    //   <img
    //     src={`http://localhost:8000/uploads/${user.file}`}
    //     alt="profile"
    //     width="150"
    //   />
    //   <h1>Welcome, {user.username}!</h1>
    //   <p>Email: {user.email}</p>
    //   <p>Range: {user.range}</p>
    //   <p>Order: {user.order}</p>
    //   <p>Select: {user.select}</p>
    //   <p>Registered on: {new Date(user.dateTime).toLocaleString()}</p>
    // </div>

    <div className="Dashboard">
      <div className="container-Dashboard">
        <div className="row-Dashboard">
          <div className="box-dashboard">
            <Navigation/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
