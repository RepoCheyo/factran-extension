import React from 'react';
import logo from '../assets/logo-extension.png';
import { RotatingLines } from 'react-loader-spinner';

function Loading() {
  return (
    <div
      style={{
        zIndex: 1000,
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          height: 70,
          width: 70,
          marginTop: 190,
        }}
      />
      <RotatingLines
        strokeColor="#00a6fb"
        strokeWidth="5"
        animationDuration="0.6"
        width="17"
        visible={true}
      />
    </div>
  );
}

export default Loading;
