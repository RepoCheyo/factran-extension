/* global chrome */
import React, { useState } from 'react';
import LoginInput from '../components/Auth/LoginInput';
import FactranButton from '../components/Home/factranButton';
import logo from '../assets/logo-extension.png';
import { useNavigate } from 'react-router-dom';
import instance from '../utils/axiosInstance';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    setLoading(true);
    setError('');
    try {
      await instance
        .post('/auth/login', {
          username: username,
          password: password,
        })
        .then((response) => {
          const token = response.data.token;
          chrome.storage.local.set({ Authorization: token });
          setLoading(false);
          setSuccess(true);
        });
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response.data.message;

      setError(errorMessage);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <div
        style={{
          alignContent: 'center',
          marginTop: 40,
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            height: 70,
            width: 70,
            marginLeft: 45,
          }}
        />
        <h1
          style={{
            justifyContent: 'center',
          }}
        >
          Hola de nuevo!
        </h1>
      </div>
      <LoginInput
        onChangeUsername={(e) => setUsername(e.target.value)}
        usernameValue={username}
        onChangePassword={(e) => setPassword(e.target.value)}
        passwordValue={password}
      />
      <FactranButton
        text={
          loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.6"
              width="17"
              visible={true}
            />
          ) : (
            'Ingresa'
          )
        }
        onClick={login}
        disable={loading ? true : false}
      />
      {success && (
        <p
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: '#2ec4b6',
            fontWeight: 'bolder',
            textAlign: 'center',
          }}
        >
          Inicio de sesión existoso, vuelve abrir la extensión
        </p>
      )}
      {error && (
        <p
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: 'red',
            fontWeight: 'bolder',
            textAlign: 'center',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Login;
