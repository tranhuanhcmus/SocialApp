import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const form = document.getElementById("Register");

    const check = form.reportValidity();

    if (check) {
      try {
        await axios.post("http://localhost:5000/api/auth/register", inputs);
        alert("Register success");
      } catch (error) {
        setError(error.response.data);
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            eligendi consequuntur velit beatae nulla eius optio laborum id
            itaque recusandae.
          </p>
          <span>Do you have account?</span>
          <Link to="/Login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form action="" id="Register">
            <input
              required
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              required
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {error}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
