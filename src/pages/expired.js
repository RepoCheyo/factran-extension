import React from 'react';
import { BiSolidError } from 'react-icons/bi';

function Expired({ text }) {
  return (
    <div
      style={{
        zIndex: 1000,
        height: '100%',
        width: '100%',
        position: 'absolute',
        backdropFilter: 'blur(15px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderRadius: ' 12px',
        border: '1px solid rgba(209, 213, 219, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: '#202123',
          width: 250,
          height: 80,
          padding: 20,
          borderRadius: 15,
          marginTop: 160,
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        <h2
          style={{
            width: 68,
            color: 'white',
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {' '}
          <BiSolidError size={20} color="#ef233c" /> Error
        </h2>
        <p
          style={{
            color: 'white',
          }}
        >
          Ups... parece que tu sesión ha expirado, abre de nuevo la extensión
          para ingresar
        </p>
      </div>
    </div>
  );
}

export default Expired;
