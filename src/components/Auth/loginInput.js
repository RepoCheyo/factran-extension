import React from 'react';
import { PiEyeClosedBold } from 'react-icons/pi';

function LoginInput({
  onChangeUsername,
  usernameValue,
  onChangePassword,
  passwordValue,
}) {
  return (
    <div style={{ justifyContent: 'center', padding: 10 }}>
      <h5
        style={{
          fontWeight: 'bold',
          fontSize: '12px',
          marginBottom: '5px',
          marginTop: '20px',
          color: 'rgb(60, 60, 60)',
        }}
      >
        Usuario
      </h5>
      <input
        type="text"
        style={{
          width: '240px',
          padding: '0.5em 0.5em',
          backgroundColor: '#fff',
          border: '1.5px solid rgb(219, 219, 219)',
          borderRadius: '6px',
        }}
        onChange={onChangeUsername}
        value={usernameValue}
      ></input>
      <h5
        style={{
          fontWeight: 'bold',
          fontSize: '12px',
          marginBottom: '5px',
          marginTop: '20px',
          color: 'rgb(60, 60, 60)',
        }}
      >
        Contraseña
      </h5>
      <input
        type="password"
        style={{
          width: '240px',
          padding: '0.5em 0.5em',
          backgroundColor: '#fff',
          border: '1.5px solid rgb(219, 219, 219)',
          borderRadius: '6px',
        }}
        onChange={onChangePassword}
        value={passwordValue}
      ></input>
      {/* <PiEyeClosedBold
        color="#cdcdcd"
        size={15}
        style={{
          position: 'absolute',
        }}
      /> */}
    </div>
  );
}

export default LoginInput;
