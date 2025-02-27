import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white">
              Hisobingizga kiring
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.01 }}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Elektron pochta
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                           transition-all duration-200"
                  placeholder="Elektron pochtangizni kiriting"
                  value={formData.email}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Parol
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                           transition-all duration-200"
                  placeholder="Parolingizni kiriting"
                  value={formData.password}
                  onChange={handleChange}
                />
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white text-lg font-medium
                       bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                       transition-colors duration-200 shadow-md"
            >
              Kirish
            </motion.button>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Hisobingiz yo'qmi?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Bu yerda ro'yxatdan o'ting
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
