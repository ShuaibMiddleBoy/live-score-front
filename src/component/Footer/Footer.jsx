import React from 'react';
import'./Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
   <footer className="footer">
  <div className="footer-first">
    <div className="inner">
      <h3>MID WICKET</h3>
      <p>Crafting digital excellence with passion and precision. Elevate your online presence with my expertise in web development. Let's create something extraordinary together.</p>
      <div className="social-links">
        <a href="https://www.facebook.com/profile.php?id=61555558538544" target='black'>
          <i className="fa-brands fa-facebook-f" />
        </a>
        <a href="https://www.instagram.com/midwicketmatters/" target='black'>
          <i className="fa-brands fa-square-instagram" />
        </a>
        <a href="https://www.youtube.com/channel/UCHkxZf8WAqj06VEeiAOsQZw" target='black'>
          <i className="fa-brands fa-square-youtube" />
        </a>
        <a href="https://www.tiktok.com/@user92129745421608" target='black'>
        <i className="fa-brands fa-tiktok" />
        </a>
      </div>
    </div>
    <div className="inner">
      <h4>USEFUL LINKS</h4>
      <ul>
            <li>
              <i className="fa-solid fa-circle-arrow-right" />{' '}
              <Link className='links-footer' to="/about">About Us</Link>
            </li>
            <li>
              <i className="fa-solid fa-circle-arrow-right" />{' '}
              <Link className='links-footer' to="/terms-conditions">Terms & Conditions</Link>
            </li>
            <li>
              <i className="fa-solid fa-circle-arrow-right" />{' '}
              <Link className='links-footer' to="/help">Help</Link>
            </li>
            <li>
              <i className="fa-solid fa-circle-arrow-right" />{' '}
              <Link className='links-footer' to="/privacy-policy">Privacy Policies</Link>
            </li>
            <li>
              <i className="fa-solid fa-circle-arrow-right" />{' '}
              <Link className='links-footer' to="/cookies">Cookies</Link>
            </li>
          </ul>
    </div>
    <div className="inner">
      <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
      <form className="subs" action="https://formspree.io/f/myyrzndw" method="POST">
        <input type="email" placeholder="Your Email" name="email" required />
        <button type="submit">SUBSCRIBE <i className="fa-regular fa-paper-plane" /></button>
      </form>
    </div>
  </div>
  <hr style={{width: '80%', border: 'none', borderTop: '1px solid #ff6b00'}} />
  <div className="copyright">
    <p>
      Copyright  © { new Date().getFullYear() } All rights reserved. | This Site is made by Rozi Academy
    </p>
  </div>
</footer>

  );
};

export default Footer;