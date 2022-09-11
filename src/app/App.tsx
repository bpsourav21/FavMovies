import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./container/Layout";
import "./App.css";
import NotFound from "./components/NotFound";
import Movies from "./components/Movies";
import React from "react";
import Login from "./components/Login";
import { AuthProvider } from "./container/AuthProvider";
import { ProtectedRoute } from "./container/ProtectedRoute";

const App = () => {
  return (
    <div className="fluid-container">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<ProtectedRoute redirectPath="/login" />}>
                <Route index element={<Movies />} />
                <Route path="movies" element={<Movies />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
