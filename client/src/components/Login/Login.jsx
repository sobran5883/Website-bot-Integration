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

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const errorObj = {};

    if (!formData.email) {
      errorObj.email = "Please provide the email";
    } else if (!isValidEmail(formData.email)) {
      errorObj.email = "Please provide a valid email address.";
    }

    if (!formData.password) {
      errorObj.password = "Please provide the password";
    }

    setFormErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      try {
        // const url = "http://localhost:8080/api/auth";
        const url = "https://website-bot-integration.onrender.com/api/auth";
        const { data: res } = await axios.post(url, formData);
        localStorage.setItem("token", res.data);
        window.location = "/";
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message);
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

    const handleGoogleLogin = () => {
      alert("Working over it");
    };
  
  return (
    <div className="py-28 bg-[#f7f7f7] h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="container">
        <div className="max-w-md mx-auto p-4 flex flex-col justify-center items-center">
        <div className="my-10">
              <div className="text-primary text-xl font-semibold px-4 py-1 ">Log<span className="text-secondary">In</span></div>
          </div>
        <div className="mt-6 text-center w-full">
              <button onClick={handleGoogleLogin} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100">
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Continue with Google
              </button>
          </div>
          <div className="text- font-semibold my-2">
            <h1>Or</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input type="email" name="email" id="email" className={inputClasses("email")} placeholder="you@example.com" onChange={handleChange} />
              <p className="mt-2 text-pink-600 text-sm">{formErrors.email}</p>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-slate-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input type="password" name="password" id="password" className={inputClasses("password")} onChange={handleChange} />
              <p className="mt-2 text-pink-600 text-sm">{formErrors.password}</p>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <div className="flex justify-between">
              <div className="flex gap-2 text-sm">
                <h1>Dont have an account?</h1>
                <Link to='/signup' className="text-blue-500">Sign Up</Link>
              </div>
              <button type="submit" className="bg-primary hover:bg-secondary px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">
                {loading?"Loading..":"Sign In"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
