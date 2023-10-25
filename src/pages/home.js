/* global chrome */
import React, { useEffect, useState } from 'react';
import FileInput from '../components/Home/fileInput';
import FactranButton from '../components/Home/factranButton';
import instance from '../utils/axiosInstance';
import * as XLSX from 'xlsx';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.js?url';
import { RotatingLines } from 'react-loader-spinner';
import Navbar from '../components/navbar';
import Expired from './expired';

GlobalWorkerOptions.workerSrc = workerSrc;

function Home() {
  const [invoiceFile, setInvoiceFile] = useState([]);
  const [invoiceFileName, setInvoiceFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [tokenExpired, setTokenExpired] = useState(false);

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

  const handleFileChange = (event) => {
    setInvoiceFile(event.target.files[0]);

    setInvoiceFileName(event.target.files[0].name);
  };

  const factranCore = async () => {
    setError('');
    setLoading(true);
    const file = invoiceFile;
    const reader = new FileReader();

    if (reader.readAsDataURL && file instanceof Blob) {
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        const result = reader.result;

        const pdf = await getDocument(result).promise.then(async (pdf) => {
          try {
            const maxPages = pdf.numPages;
            let extractedText = '';

            for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
              const page = await pdf.getPage(pageNumber);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item) => item.str)
                .join(' ');
              extractedText += pageText + '\n';
            }

            neuralFilter(extractedText);
          } catch (error) {
            setLoading(false);

            const errorMessage = error.response.data.message;

            setError(errorMessage);
          }
        });
      };
    }
  };

  const neuralFilter = async (callContent) => {
    try {
      await instance
        .post(
          '/factran',
          {
            callContent: callContent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const factranRes = response.data;
          generateXls(factranRes);
        });
    } catch (error) {
      const errorMessage = error.response.data.message;
      setLoading(false);
      if (errorMessage === 'Tu sesión ha expirado') {
        chrome.storage.local.clear();
        setTokenExpired(true);
      } else {
        setError(errorMessage);
      }
    }
  };

  const generateXls = (data) => {
    try {
      let dataXlsx = [];

      const rows = [data][0];
      const mercData = rows.descripcion_mercancias;

      const finalData = mercData.forEach((item) =>
        dataXlsx.push({
          FACTURA: rows.numero_factura,
          ORDEN: mercData.indexOf(item) + 1,
          PARTE: item.numero_sku,
          PAIS: item.pais,
          DESC_FACTURA: item.descripcion_mercancia,
          DESC_PEDIMENTO: '',
          CANT_VU: item.cantidad_mercancia,
          UNIDAD_VU: '',
          UNI_TARIFA: '',
          CANT_TARIFA: '',
          UNI_FACT: item.unidad_medida,
          CANT_FACT: item.cantidad_mercancia,
          PRECIO_UNIT_VU: '',
          PRECIO_UNIT: item.valor_unitario,
          TOTAL: item.importe_total,
          FRACCION: '',
          MET_VAL: '',
          VINCULACION: '',
          DESCUENTO: '',
          MARCA: '',
          MODELO: '',
          SERIE: '',
          ESPECIAL: '',
          ORDEN_ITEM: '',
          IMPUESTO: '',
          FP: '',
          TASA: '',
          TT: '',
          P_I: '',
          C1: '',
          C2: '',
          C3: '',
          NUM: '',
          FIRMA: '',
          NICO: '',
          SEC_FRACCION: '',
        })
      );

      const fileName = `${rows.numero_factura}Factran.xls`;

      let wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(dataXlsx);

      XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

      XLSX.writeFile(wb, fileName);
      setLoading(false);
    } catch (error) {
      setError('Ups... algo salió mal intenta de nuevo');
    }
  };

  return (
    <>
      {tokenExpired && <Expired />}
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 80,
        }}
      >
        {/* <HeaderTabs /> */}
        <FileInput
          onChangeFile={handleFileChange}
          invoiceFile={invoiceFileName}
        />
        {invoiceFile.length === 0 ? (
          <FactranButton
            style={{
              fontWeight: 'bolder',
              color: 'white',
              backgroundColor: '#5A9DFF',
              fontSize: 14,
              height: 50,
              width: 250,
              border: '2px solid #4791FF',
              borderRadius: 10,
              marginTop: 15,
            }}
            text={'Filtrar'}
            disabled
          />
        ) : loading ? (
          <>
            <FactranButton
              disabled
              text={
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.6"
                  width="17"
                  visible={true}
                />
              }
            />
            <p
              style={{
                fontSize: 10,
                fontWeight: 500,
                fontStyle: '#DBDBDB',
                textAlign: 'center',
              }}
            >
              ⓘ Filtrar el archivo puede tomar varios segundos, no cierres la
              extensión
            </p>
          </>
        ) : (
          <FactranButton onClick={factranCore} text={'Filtrar'} />
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
        <p
          style={{
            position: 'absolute',
            fontSize: 8,
            fontWeight: 350,
            fontStyle: '#F2F2F2',
            bottom: 0,
          }}
        >
          Factran © 2023
        </p>
      </div>
    </>
  );
}

export default Home;
