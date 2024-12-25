import React from "react";

const Header = () => {
  return (
    <header>
      <div>
        <img
          src="logo.jpg"
          alt="Logo de votre formation"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  );
};

export default Header;
