import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import TermsConditionsStyles from "./TermsConditions.module.css";

const termsConditionsData = [
  {
    title: "Introduction",
    content: [
      "Welcome to our website.",
      "By accessing this website, you agree to be bound by these terms and conditions.",
    ],
  },
  {
    title: "Use of Website",
    content: [
      "You may use this website for personal purposes and in accordance with these terms and conditions.",
      "You must not use this website for any unlawful or prohibited purpose.",
    ],
  },
  {
    title: "Intellectual Property Rights",
    content: [
      "All intellectual property rights in this website and its content belong to us or our licensors.",
      "You may not reproduce, distribute, or publish any content from this website without our prior written consent.",
    ],
  },
];

export default function TermsConditions() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("terms-conditions");
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
    <div id="terms-conditions">
      <CSSTransition in={fadeIn} timeout={500} classNames="fade" unmountOnExit>
        <div className={TermsConditionsStyles.container}>
          <h1 className={TermsConditionsStyles.title}>Terms and Conditions</h1>
          {termsConditionsData.map((section, index) => (
            <div key={index}>
              <h2 className={TermsConditionsStyles.sectionTitle}>
                {section.title}
              </h2>
              <ul className={TermsConditionsStyles.contentList}>
                {section.content.map((clause, idx) => (
                  <li key={idx} className={TermsConditionsStyles.contentItem}>
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
