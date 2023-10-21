/* global chrome */
import React, { useEffect, useState } from 'react';
import { CgCloseO } from 'react-icons/cg';
import instance from '../utils/axiosInstance';

function Report({ onClickBg }) {
  const [reportcont, setReportCont] = useState('');
  const [token, setToken] = useState('');
  const [success, setSucc] = useState('');
  const [error, setError] = useState('');

  const getToken = () => {
    chrome.storage.local.get(['Authorization']).then((result) => {
      const jwt = result.Authorization;
      if (jwt) {
        setToken(jwt);
      }
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  const sendReport = async () => {
    try {
      await instance
        .post(
          '/report',
          {
            report_content: reportcont,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          alert('sended');
          //   const succ = response;
          //   setSucc(succ);
        });
    } catch (error) {
      //   const errorMessage = error.response.data.message;
      console.log(error);
    }
  };

  return (
    <div
      style={{
        zIndex: 10000,
        background: '#202123',
        height: '45vh',
        padding: 15,
        width: '100%',
        position: 'absolute',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 3px 12px',
      }}
    >
      <CgCloseO
        size={18}
        color="white"
        style={{
          cursor: 'pointer',
        }}
        onClick={onClickBg}
      />
      <h2
        style={{
          color: 'white',
          marginTop: 10,
        }}
      >
        Reporte
      </h2>
      <p
        style={{
          color: 'white',
        }}
      >
        Describa el fallo que tuvo la aplicación
      </p>
      <textarea
        value={reportcont}
        onChange={(e) => setReportCont(e.target.value)}
        type="text"
        style={{
          padding: '10px',
          zIndex: 100000,
          backgroundColor: 'white',
          width: 295,
          height: 80,
          resize: 'none',
          borderRadius: 10,
        }}
      />
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <button
        style={{
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: '#076BFF',
          fontSize: 14,
          padding: 5,
          border: 'none',
          borderRadius: 5,
          marginLeft: 260,
          marginTop: 5,
          cursor: 'pointer',
        }}
        disabled={reportcont.length < 5 ? true : false}
        onClick={sendReport}
      >
        Enviar
      </button>
    </div>
  );
}

export default Report;
