import React, { useState } from "react";
import SignUpStyles from "./SignUp.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
        `${import.meta.env.VITE_BASE_URL}users/user-signup`,
        formData
      );
      if (response.status === 201) {
        toast.warning("User created successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        // Clear the form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error("Error creating user. Please try again later", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error in sign-up:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={SignUpStyles.container}>
        <h1 className={SignUpStyles.title}>Sign Up Here</h1>
        <form className={SignUpStyles.form} onSubmit={handleSubmit}>
          <div className={SignUpStyles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={SignUpStyles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={SignUpStyles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={SignUpStyles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={SignUpStyles.formGroup}>
            <label htmlFor="phone">Phone No</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={SignUpStyles.input}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={SignUpStyles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={SignUpStyles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={SignUpStyles.buttonGroup}>
            <button type="submit" className={SignUpStyles.button}>
              Sign Up
            </button>
            <Link to="/sign-in" className={SignUpStyles.alreadyMember}>
              Already a member?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
