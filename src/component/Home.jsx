import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
