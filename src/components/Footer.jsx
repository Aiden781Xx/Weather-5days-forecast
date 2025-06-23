 import React from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'; // ✅ Correct source

const Footer = () => {
  return (
    <div className="footer">
      <a href="https://instagram.com/__bhardwaj750" target="_blank" rel="noreferrer">
        <FaInstagram />
      </a>
      <a href="https://facebook.com/bhardwaj750" target="_blank" rel="noreferrer">
        <FaFacebookF />
      </a>
      <a href="https://wa.me/7505611192" target="_blank" rel="noreferrer">
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default Footer;
