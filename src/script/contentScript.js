/* global chrome */
import React, { useEffect, useState } from "react";

function ContentScript() {
  const [noFactura, setNoFactura] = useState(null);
  const [desc, setDesc] = useState([]);
  const [inco, setInco] = useState(null);
  const [curr, setCurr] = useState(null);
  const [date, setDate] = useState(null);

  const getStored = () => {
    try {
      chrome.storage.sync
        .get([
          "numero_factura",
          "descripcion_mercancias",
          "moneda",
          "incoterm",
          "fecha_expedicion",
        ])
        .then((result) => {
          setNoFactura(result.numero_factura);
          setDesc(result.descripcion_mercancias);
          setInco(result.incoterm);
          setCurr(result.moneda);
          setDate(result.fecha_expedicion);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba( 255, 255, 255, 0.7 )",
        backdropFilter: "blur( 15.5px )",
        height: 150,
        width: 400,
        position: "absolute",
        bottom: 20,
        left: 20,
        borderRadius: 30,
        overflow: "scroll",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        zIndex: 100,
      }}
    >
      <button
        onClick={getStored}
        style={{
          backgroundColor: "black",
          position: "sticky",
          top: 10,
          color: "white",
          fontWeight: "bolder",
          textAlign: "center",
          left: 200,
        }}
      >
        Refresh
      </button>
      {noFactura && <p>Número de factura: {noFactura}</p>}
      {inco && <p>Incoterm: {inco}</p>}
      {curr && <p>Moneda: {curr}</p>}
      {date && <p>Fecha de expedición: {date}</p>}
      {desc && (
        <div>
          {desc.map((item, i) => (
            <div
              style={{
                borderTop: "2px solid black",
              }}
              key={i}
            >
              <p>Descripcion: {item.descripcion_mercancia}</p>
              <p>Valor unitario: {item.valor_unitario}</p>
              <p>Cantidad: {item.cantidad_mercancia}</p>
              <p>Unidad de medida: {item.unidad_medida}</p>
              <p>Numero SKU: {item.numero_sku}</p>
              <p>Modelo: {item.modelo}</p>
              <p>País: {item.pais}</p>
              <p>Importe total de mercancia: {item.importe_total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContentScript;
