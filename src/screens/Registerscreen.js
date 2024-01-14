import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function check() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      try {
        setloading(true);

        await axios.post(
          "https://hotel-booking-app-lemon.vercel.app/api/users/register",
          user
        ).data;

        setloading(false);
        setsuccess(true);
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      alert(`Passwords do not match`);
    }
  }
  return (
    <div>
      {loading && <Loader />}
      {error && <Error message="Something went wrong" />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registeration Success" />}
          <div className="bs padding">
            <h1>Register</h1>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
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
            <input
              type="password"
              className="form-control mt-2"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
            />

            <button className="btn-primary btn" onClick={check}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
