import React from 'react';
import CookiesStyles from './Cookies.module.css';

export default function Cookies() {
  return (
    <div className={CookiesStyles.container}>
      <h1 className={CookiesStyles.title}>Cookies Policy</h1>
      <p className={CookiesStyles.description}>
        This website uses cookies to ensure you get the best experience on our website.
      </p>
      <h2 className={CookiesStyles.sectionTitle}>What Are Cookies</h2>
      <p className={CookiesStyles.content}>
        Cookies are small text files that are placed on your computer by websites that you visit.
        They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
      </p>
      <h2 className={CookiesStyles.sectionTitle}>How We Use Cookies</h2>
      <p className={CookiesStyles.content}>
        We use cookies to improve your browsing experience on our website, analyze our website traffic, and understand where our visitors are coming from.
        By browsing our website, you consent to our use of cookies.
      </p>
      <h2 className={CookiesStyles.sectionTitle}>Types of Cookies We Use</h2>
      <p className={CookiesStyles.content}>
        We use both session cookies and persistent cookies on our website.
        Session cookies are temporary cookies that are stored on your device until you close your web browser.
        Persistent cookies remain on your device for a set period of time or until you delete them manually.
      </p>
      <h2 className={CookiesStyles.sectionTitle}>How to Manage Cookies</h2>
      <p className={CookiesStyles.content}>
        You can control and manage cookies in your web browser settings. You can also delete cookies already stored on your computer.
        Please note that disabling cookies may affect your browsing experience on our website.
      </p>
    </div>
  );
}