import React from "react";

function HeaderTabs() {
  return (
    <div
      style={{
        display: "flex",
        top: 70,
        position: "absolute",
        borderRadius: 30,
        backgroundColor: "#EFEFEF",
      }}
    >
      <button
        style={{
          fontWeight: "bolder",
          color: "white",
          backgroundColor: "#00213F",
          fontSize: 12,
          height: 40,
          width: 100,
          border: "none",
          borderRadius: 20,
          cursor: "pointer",
        }}
      >
        Archivo
      </button>
      <button
        style={{
          fontWeight: "bolder",
          color: "black",
          backgroundColor: "#EFEFEF",
          fontSize: 12,
          height: 40,
          width: 100,
          border: "none",
          borderRadius: 20,
        }}
      >
        Texto
      </button>
    </div>
  );
}

export default HeaderTabs;
