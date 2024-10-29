'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Input, Button, Card, Table, Loading, Pagination } from '@nextui-org/react';

const UploadViewExcelSheetsBeta = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0); // Progreso de la carga
  const rowsPerPage = 10; // Número de filas a mostrar por página

  // handle file selection
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        // Manejo de progreso de carga
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentLoaded = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percentLoaded);
          }
        };

        reader.onloadstart = () => {
          setUploadProgress(0); // Reiniciar barra de progreso
          setLoading(true);
        };

        reader.onload = (e) => {
          setExcelFile(e.target.result);
          setExcelData(XLSX.utils.sheet_to_json(e.target.result));
          setLoading(false); // Detener loading cuando se ha completado la carga
        };
      } else {
        setTypeError('Please select only Excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  // handle file submission
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      setLoading(true);
      try {
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(data); // Cargar todos los datos
        setLoading(false);
      } catch (error) {
        console.error("Error processing Excel file: ", error);
        setLoading(false);
      }
    }
  };

  const handlerAddExcel = async () => {
    if (!excelData || excelData.length === 0) {
      alert('No hay datos para subir a la base de datos.');
      return;
    }

    try {
      const response = await fetch('/api/uploadExcel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(excelData), // Envío de datos en formato JSON
      });

      if (!response.ok) {
        throw new Error('Error al subir los datos a la base de datos');
      }

      const result = await response.json();
      alert(`Datos subidos exitosamente: ${result.message}`);
      setExcelData(null); // Reinicia el estado después de la carga
    } catch (error) {
      console.error('Error al subir los datos:', error);
      alert('Hubo un error al subir los datos. Por favor, inténtalo de nuevo.');
    }
  };

  // Paginación de los datos
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = excelData.slice(indexOfFirstRow, indexOfLastRow);

  // Cambiar de página
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-6">
      <Card css={{ p: "$8", mw: "800px" }}>
        <h3 className="text-2xl font-bold text-center mb-6">Upload & View Excel Sheets</h3>

        {/* Form */}
        <form className="mb-6" onSubmit={handleFileSubmit}>
          <div className="mb-4">
            <Input 
              type="file" 
              fullWidth 
              bordered 
              labelPlaceholder="Upload Excel File"
              required 
              onChange={handleFile} 
            />
          </div>
          <Button 
            type="submit" 
            shadow
            color="primary" 
            fullWidth
          >
            {loading ? <Loading type="points" color="currentColor" size="sm" /> : 'Upload'}
          </Button>

          {typeError && (
            <div className="mt-4 text-red-600 text-center">{typeError}</div>
          )}
        </form>

        {/* Loading bar */}
        {loading && (
          <div className="w-full bg-gray-200 h-4 rounded-lg overflow-hidden">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* View data */}
        {!loading && excelData && excelData.length > 0 ? (
          <>
            <Button
              type="button"
              onClick={handlerAddExcel}
              shadow
              color="success" 
              fullWidth
            >
              Subir Archivo BD Centralizada
            </Button>
            <Table
              aria-label="Excel data table"
              css={{
                height: "auto",
                minWidth: "100%",
                mt: "$6"
              }}
            >
              <Table.Header>
                {Object.keys(currentRows[0]).map((key) => (
                  <Table.Column key={key}>{key}</Table.Column>
                ))}
              </Table.Header>
              <Table.Body>
                {currentRows.map((row, index) => (
                  <Table.Row key={index}>
                    {Object.keys(row).map((key) => (
                      <Table.Cell key={key}>{row[key]}</Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            {/* Paginación */}
            <Pagination 
              total={Math.ceil(excelData.length / rowsPerPage)} 
              initialPage={currentPage}
              onChange={(page) => handlePageChange(page)}
              css={{ mt: "$4" }}
            />
          </>
        ) : (
          !loading && (
            <div className="text-center text-gray-500 mt-4">No file uploaded yet or file is empty!</div>
          )
        )}
      </Card>
    </div>
  );
};

export default UploadViewExcelSheetsBeta;
