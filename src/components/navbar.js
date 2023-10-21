import React, { useState } from 'react';
import logo from '../assets/logo-extension.png';
import { IoMenu } from 'react-icons/io5';
import NavbarMenu from './navbarMenu';

function Navbar() {
  const [menu, setMenu] = useState(false);

  return (
    <div
      style={{
        top: 0,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        width: '100%',
        height: '10vh',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            height: 40,
            width: 40,
            padding: 7,
          }}
        />
        <p
          style={{
            marginTop: 38,
            left: 30,
            position: 'absolute',
            width: 20,
            height: 8,
            fontWeight: 'bolder',
            backgroundImage: 'linear-gradient(to right, #11998e, #38ef7d)',
            fontSize: 6,
            borderRadius: 5,
            color: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 3px 12px',
            textAlign: 'center',
          }}
        >
          Beta
        </p>
      </div>
      <IoMenu
        onClick={() => {
          setMenu(!menu);
        }}
        color="#cdcdcd"
        size={25}
        style={{
          padding: 12,
          cursor: 'pointer',
        }}
      />
      {menu && <NavbarMenu />}
    </div>
  );
}

export default Navbar;
