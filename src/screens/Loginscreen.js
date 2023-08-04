import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  async function check() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const result = await axios.post(
        "https://hotel-booking-app-lemon.vercel.app/api/users/login",
        user
      );
      setloading(false);
      window.localStorage.setItem("currentUser", JSON.stringify(result));

      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invaid Credentials" />}
          <div className="bs padding">
            <h1>Login</h1>
            <input
              type="email"
              className="form-control mt-2"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <button className="btn-primary btn" onClick={check}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
