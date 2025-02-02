import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateData = ({ username, email, password }) => {
  const errorObj = {};

  if (!username) errorObj.username = "Please provide the username";
  if (!email) {
    errorObj.email = "Please provide the email";
  } else if (!isValidEmail(email)) {
    errorObj.email = "Please provide a valid email address.";
  }

  if (!password) {
    errorObj.password = "Please provide the password";
  } else if (password.length < 4) {
    errorObj.password = "Password length should be at least 4";
  }
  return errorObj;
};

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const errorObj = validateData(formData);
    setFormErrors(errorObj);

    if (Object.keys(errorObj).length === 0) {
      try {
        // const url = "http://localhost:8080/api/users";
        const url = "https://website-bot-integration.onrender.com/api/users";
        const { data: res } = await axios.post(url, {
          firstName: formData.username, // Map username to firstName
          email: formData.email,
          password: formData.password,
        });
        setMsg(res.message);
        setError("");
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message);
          setMsg("");
        }
      }
    }
    setLoading(false)
  };

  const inputClasses = (field) =>
    `block w-full sm:text-sm px-3 py-2 bg-white border border-slate-300 shadow-sm rounded-md
    placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    ${formErrors[field] ? "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500" : ""}`;

  const fieldErrorClasses = (field) => `mt-2 ${formErrors[field] ? "visible" : "invisible"} text-pink-600 text-sm`;

  return (
    <div className="py-28 bg-[#f7f7f7] h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="container">
        <div className="max-w-md mx-auto p-4 flex flex-col justify-center items-center">
          <div className="my-10">
              <div className="text-primary text-xl font-semibold px-4 py-1 ">Sign<span className="text-secondary">Up</span></div>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1 text-sm font-medium text-slate-700">
                Username <span className="text-red-500">*</span>
              </label>
              <input type="text" name="username" id="username" className={inputClasses("username")} placeholder="Username.." onChange={handleChange} />
              <p className={fieldErrorClasses("username")}>{formErrors.username}</p>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input type="email" name="email" id="email" className={inputClasses("email")} placeholder="you@example.com" onChange={handleChange} />
              <p className={fieldErrorClasses("email")}>{formErrors.email}</p>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-slate-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input type="password" name="password" id="password" className={inputClasses("password")} onChange={handleChange} />
              <p className={fieldErrorClasses("password")}>{formErrors.password}</p>
            </div>

            {msg && <p className="text-green-600 text-sm mt-2">{msg}</p>}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <div className="flex justify-between">
              <div className="flex gap-2 text-sm">
                <h1>Have an account?</h1>
                <Link to='/Login' className="text-blue-500">Login</Link>
              </div>
              <button type="submit" className="bg-primary hover:bg-secondary px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">
                {loading? "Sending...":"Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
