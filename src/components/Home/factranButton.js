import React from 'react';

function FactranButton({ onClick, text, ...rest }) {
  return (
    <button
      style={{
        fontWeight: 'bolder',
        color: 'white',
        backgroundColor: '#076BFF',
        fontSize: 14,
        height: 50,
        width: 250,
        border: '2px solid #4791FF',
        borderRadius: 10,
        marginTop: 15,
        cursor: 'pointer',
      }}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}

export default FactranButton;
