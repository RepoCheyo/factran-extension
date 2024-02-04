/* global chrome */
import React, { useEffect, useState } from 'react';
import FactranButton from '../components/Home/factranButton';
// import logo from '../assets/logo-extension.png';

function ContentScript() {
  const [open, setOpened] = useState(false);
  // const [token, setToken] = useState('');

  const factranLogo = chrome.runtime.getURL('logo.png');

  // const getToken = () => {
  //   chrome.storage.local.get(['Authorization']).then((result) => {
  //     const jwt = result.Authorization;
  //     if (jwt) {
  //       setToken(jwt);
  //     } else {
  //       setToken('No token');
  //     }
  //   });
  // };

  return (
    <div
      style={
        open
          ? {
              backgroundColor: 'black',
              height: 50,
              left: 10,
              bottom: 10,
              width: 300,
              right: 0,
              backgroundAttachment: 'scroll',
              position: 'fixed',
              borderRadius: 50,
              cursor: 'pointer',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              zIndex: 10000,
              display: 'flex',
            }
          : {
              backgroundColor: 'black',
              height: 50,
              left: 10,
              bottom: 10,
              width: 70,
              right: 0,
              backgroundAttachment: 'scroll',
              position: 'fixed',
              borderRadius: 50,
              cursor: 'pointer',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              zIndex: 10000,
              display: 'flex',
            }
      }
      onClick={() => {
        setOpened(!open);
        console.log(factranLogo);
      }}
    >
      <img
        src={factranLogo}
        alt="logo"
        style={{
          height: 50,
          width: 50,
          alignContent: 'center',
        }}
      />
    </div>
  );
}

export default ContentScript;
