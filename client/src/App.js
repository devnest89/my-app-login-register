import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./registerwithlogin/Login.js";
import Register from "./registerwithlogin/Register.js";
import Dashboard from "./dashbord/dashboard.js";
import Update from "./Update/Update.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:username" element={<Dashboard />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;


