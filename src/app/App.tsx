import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./container/Layout";
import "./App.css";
import NotFound from "./components/NotFound";
import Movies from "./components/Movies";
import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./container/AuthProvider";
import { ProtectedRoute } from "./container/ProtectedRoute";
import AlertComponent from "./components/AlertComponent";
import LoadingOverlay from "./components/LoadingOverlay";
import { useAppSelector } from "./hooks";

const App = () => {
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const alert = useAppSelector((state) => state.common.alert);

  return (
    <div className="container">
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
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {isLoading && <LoadingOverlay />}
      {alert != null && <AlertComponent alert={alert} />}
    </div>
  );
};

export default App;
