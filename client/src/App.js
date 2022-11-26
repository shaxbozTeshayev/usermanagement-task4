import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecodeToken from "./components/DecodeToken";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Block from "./pages/block/Block";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  const currentUser = DecodeToken();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={currentUser ? <AdminPanel /> : <Login />} />
          <Route
            path="/register"
            element={currentUser ? <AdminPanel /> : <Register />}
          />
          <Route
            path="/login"
            element={currentUser ? <AdminPanel /> : <Login />}
          />
          <Route
            path="/blocked"
            element={currentUser ? <Block /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
