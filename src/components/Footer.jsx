import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear(); 

  return (
    <footer className="text-5xl text-center mt-4">
      © {year} - Yassine Lamouadden && Ouldelhkim Souhail Ismail, Tous droits réservés.
    </footer>
  );
};

export default Footer;
