import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/logo-removebg-preview.png";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  SportsSoccer as SportsSoccerIcon,
  Schedule as ScheduleIcon,
  Announcement as AnnouncementIcon,
  LibraryBooks as LibraryBooksIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Videocam as VideocamIcon,
  SportsCricket as SportsCricketIcon,
  Android as RobotIcon,
} from "@mui/icons-material";
import axios from "axios";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState("");
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenu(menuItem);
    setIsSubMenuOpen(false);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleVideo = () => {
    navigate("/upload-videos");
  };

  const handleBlogs = () => {
    navigate("/upload-blogs");
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        setUserLoggedIn(false);
      } else {
        setUserLoggedIn(true);
      }

      // Fetch isAdmin status
      axios
        .get(`${import.meta.env.VITE_BASE_URL}users/user-is-admin`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setIsAdmin(response.data.isAdmin);
        })
        .catch((error) => {
          console.error("Error fetching isAdmin:", error);
        });
    }
  }, []);

  useEffect(() => {
    const currentPathname = location.pathname;

    let newActiveMenu = "";
    if (currentPathname === "/live-scores") {
      newActiveMenu = "live-scores";
    } else if (currentPathname === "/schedule") {
      newActiveMenu = "schedule";
    } else if (currentPathname === "/news") {
      newActiveMenu = "news";
    } else if (currentPathname === "/videos") {
      newActiveMenu = "videos";
    } else if (currentPathname === "/chatbot") {
      newActiveMenu = "chatbot";
    } else if (
      currentPathname === "/blogs" ||
      currentPathname === "/upload-blogs"
    ) {
      newActiveMenu = "blogs";
    } else if (currentPathname.startsWith("/rankings")) {
      newActiveMenu = "rankings";
    }

    setActiveMenu(newActiveMenu);
  }, [location.pathname]);

  return (
    <div className={`header`} ref={navRef}>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </Link>
      <div className={`nav-links ${showNavbar && "active"}`}>
        <ul>
          <li
            className={activeMenu === "live-scores" ? "nav-link-active" : ""}
            onClick={() => handleMenuItemClick("live-scores")}
          >
            <Link to="/live-scores">
              <SportsSoccerIcon /> Live Scores
            </Link>
          </li>
          <li className={activeMenu === "schedule" ? "nav-link-active" : ""}>
            <Link to="/schedule">
              <ScheduleIcon /> Schedule
            </Link>
          </li>
          <li className={activeMenu === "news" ? "nav-link-active" : ""}>
            <Link to="/news">
              <AnnouncementIcon /> News
            </Link>
          </li>
          <li className={activeMenu === "videos" ? "nav-link-active" : ""}>
            <Link to="/videos">
              <VideocamIcon /> Videos
            </Link>
          </li>
          <li className={activeMenu === "blogs" ? "nav-link-active" : ""}>
            <Link to="/blogs">
              <LibraryBooksIcon /> Blogs
            </Link>
          </li>
          <li className={`nav-item-dropdown ${activeMenu === "rankings" ? "nav-link-active" : ""}`}>
            <button onClick={toggleSubMenu}>
              <span>
                <SportsCricketIcon /> Rankings <ArrowDropDownIcon />
              </span>
            </button>
            {isSubMenuOpen && (
              <ul className="submenu">
                <li>
                  <Link to="/rankings/men" onClick={() => setIsSubMenuOpen(false)}>Men</Link>
                </li>
                <li>
                  <Link to="/rankings/women" onClick={() => setIsSubMenuOpen(false)}>Women</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            {userLoggedIn && (
              <div className="signBTns">
                {isAdmin && (
                  <button onClick={handleBlogs} className="button">Blogs</button>
                )}
                <button className="button" onClick={handleVideo}>Videos</button>
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="menu-icon" onClick={handleShowNavbar}>
        {showNavbar ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
}
