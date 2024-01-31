import React, { useState } from "react";
import SignInStyles from "./SignIn.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}users/user-signin`,
        formData
      );
      if (response.status === 200) {
        toast.success("Sign-in successful", {
          position: "top-right",
          autoClose: 3000,
        });
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid email or password. Please try again", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error in sign-in:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={SignInStyles.container}>
        <h1 className={SignInStyles.title}>Sign In Here</h1>
        <form className={SignInStyles.form} onSubmit={handleSubmit}>
          <div className={SignInStyles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={SignInStyles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={SignInStyles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={SignInStyles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={SignInStyles.buttonGroup}>
            <button type="submit" className={SignInStyles.button}>
              Sign In
            </button>
            <Link to="/sign-up" className={SignInStyles.newHere}>New here?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}