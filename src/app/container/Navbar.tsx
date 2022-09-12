import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/authActions";
import { useAppDispatch } from "../hooks";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout(() => navigate("/login", { replace: true })))
  }
  return (
    <div>
      <nav className="navbar fixed-top navbar-dark bg-secondary mb-5">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Movie List
          </Link>
          <div className="d-flex">
            <button
              className="btn btn-outline-warning"
              onClick={() => onLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
