import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();
  const onLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.authToken) {
      localStorage.setItem("token", data.authToken);
      history("/");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="container d-flex justify-content-center my-5">
      <div
        className="container card"
        style={{ width: "30rem", height: "30rem" }}
      >
        <div className="card-body container my-3">
          <h5 className="card-title d-flex justify-content-center">Login</h5>

          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary" onClick={onLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
