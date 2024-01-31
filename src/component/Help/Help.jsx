import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import HelpStyles from "./Help.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Help() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("help");
      if (element && window.scrollY + window.innerHeight >= element.offsetTop) {
        setFadeIn(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const message = e.target.message.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}contact/create-contact-us`,
        {
          Name: name,
          Email: email,
          PhoneNo: phone,
          Message: message,
        }
      );

      if (response.status === 201) {
        toast.success("Contact created successfully", {
          position: "top-right",
        });
        console.log("Contact created successfully");
      } else {
        toast.error("Failed to create contact", { position: "top-right" });
        console.error("Failed to create contact");
      }
    } catch (error) {
      toast.error("An error occurred", { position: "top-right" });
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div id="help">
        <CSSTransition
          in={fadeIn}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div className={HelpStyles.container}>
            <h1 className={HelpStyles.title}>Contact Us for Help</h1>
            <form className={HelpStyles.form} onSubmit={handleSubmit}>
              <div className={HelpStyles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={HelpStyles.input}
                />
              </div>
              <div className={HelpStyles.mainFormGroup}>
                <div className={HelpStyles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={HelpStyles.input}
                  />
                </div>
                <div className={HelpStyles.formGroup}>
                  <label htmlFor="phone">Phone No</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className={HelpStyles.input}
                  />
                </div>
              </div>
              <div className={HelpStyles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className={HelpStyles.textarea}
                ></textarea>
              </div>
              <button type="submit" className={HelpStyles.button}>
                Submit
              </button>
            </form>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
