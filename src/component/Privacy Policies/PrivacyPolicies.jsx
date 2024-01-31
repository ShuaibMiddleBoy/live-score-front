import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import PrivacyPoliciesStyles from "./PrivacyPolicies.module.css";

const privacyPoliciesData = [
  {
    title: "Introduction",
    content: [
      "Welcome to MidWicketMatters (the 'Website').",
      "By accessing this Website, you agree to be bound by these terms and conditions.",
    ],
  },
  {
    title: "Use of Website",
    content: [
      "You may use this Website for personal purposes and in accordance with these terms and conditions.",
      "You must not use this Website for any unlawful or prohibited purpose.",
    ],
  },
  {
    title: "Intellectual Property Rights",
    content: [
      "All intellectual property rights on this Website and its content belong to MidWicketMatters or its licensors.",
      "You may not reproduce, distribute, or publish any content from this Website without MidWicketMatters' prior written consent.",
    ],
  },
  {
    title: "Collection of Personal Information",
    content: [
      "MidWicketMatters may collect and use your personal information as described in our Privacy Policy.",
      "By using this Website, you consent to the collection and use of your personal information as described in the Privacy Policy.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "This Website may use cookies to enhance your experience.",
      "By using this Website and agreeing to these terms and conditions, you consent to MidWicketMatters' use of cookies in accordance with the terms of our Privacy Policy.",
    ],
  },
];

export default function PrivacyPolicies() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("privacy-policies");
      if (element && window.scrollY + window.innerHeight >= element.offsetTop) {
        setFadeIn(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="privacy-policies">
      <CSSTransition in={fadeIn} timeout={500} classNames="fade" unmountOnExit>
        <div className={PrivacyPoliciesStyles.container}>
          <h1 className={PrivacyPoliciesStyles.title}>Privacy Policies</h1>
          {privacyPoliciesData.map((section, index) => (
            <div key={index}>
              <h2 className={PrivacyPoliciesStyles.sectionTitle}>
                {section.title}
              </h2>
              <ul className={PrivacyPoliciesStyles.contentList}>
                {section.content.map((clause, idx) => (
                  <li key={idx} className={PrivacyPoliciesStyles.contentItem}>
                    {clause}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}
