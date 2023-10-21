import React from 'react';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';

function FileInput({ onChangeFile, invoiceFile }) {
  return (
    <div
      style={{
        height: 190,
        width: 250,
        backgroundColor: '#EEEE',
        border: '2px dashed #DBDBDB',
        borderRadius: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <input
        type="file"
        style={{
          position: 'absolute',
          border: 'none',
          backgroundColor: 'none',
          opacity: 0,
          width: 250,
          height: 190,
          marginTop: 10,
        }}
        accept="application/pdf"
        onChange={onChangeFile}
      />
      <BsFillFileEarmarkPdfFill color="#FF6058" size={50} />
      {invoiceFile === null ? (
        <>
          <h2>Arrastra la factura</h2>
          <div
            style={{
              position: 'absolute',
              width: 60,
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: 90,
            }}
          >
            <p style={{ fontSize: 14 }}>ó</p>
            <div>
              <p
                style={{
                  fontSize: 14,
                  color: '#FF0B00',
                  textDecoration: 'underline',
                }}
              >
                explora
              </p>
            </div>
          </div>
        </>
      ) : (
        <p
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bolder',
          }}
        >
          {invoiceFile}
        </p>
      )}
    </div>
  );
}

export default FileInput;
