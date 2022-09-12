import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../actions/authActions";
import { SignupDto } from "../dtos/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AuthState } from "../reducers/authReducer";

const Signup = () => {
  const authState: AuthState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var target = e.currentTarget as HTMLFormElement;

    const signUpCred: SignupDto = {
      name: target._name.value,
      email: target._email.value,
      password: target._password.value,
    }

    dispatch(
      signup(signUpCred, () => {
        navigate("/login", { replace: true });
      })
    );
  };

  return (
    <section className="vh-100 login">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: 1 }}>
            <div className="card-body p-5">
              <form onSubmit={(e) => onSubmitSignup(e)}>
                <h2 className="text-center mb-2">Signup</h2>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-person-badge"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="_name"
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    name="_email"
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-patch-exclamation-fill"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="_password"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-2 mb-2 "
                  >
                    Signup
                  </button>
                  <p className="mt-2">Already registered? <Link to="/login">Login</Link></p>
                  <p style={{ color: "red", height: "10px" }}>
                    {authState.loginErrorMsg}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
