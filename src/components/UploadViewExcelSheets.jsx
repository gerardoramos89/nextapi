'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadViewExcelSheets = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  // handle file selection
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError('Please select only Excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  // handle file submission and API upload
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      // Leer los datos del archivo Excel
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
  
      // Establecer los primeros 10 registros para vista previa
      setExcelData(data.slice(0, 10));
  
      const selectedFile = e.target[0].files[0];
  
      try {
        // Llamada al API para subir los datos
        const response = await fetch('/api/uploadexcel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: data, // Datos del Excel
            metadata: {
              fileName: selectedFile.name,
              fileType: selectedFile.type,
              size: selectedFile.size,
            },
          }),
        });
  
        const result = await response.json();
        console.log(result)
        if (result.message) {
          setUploadStatus(result.message);
        } else {
          setUploadStatus(result.error);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Error uploading data');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-7xl">
        <h3 className="text-2xl font-bold text-center text-gray-700 mb-6">Upload & View Excel Sheets</h3>

        {/* Form */}
        <form className="mb-6" onSubmit={handleFileSubmit}>
          <div className="mb-4">
            <input 
              type="file" 
              className="block w-full text-gray-700 px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
              required 
              onChange={handleFile} 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Upload
          </button>
          {typeError && (
            <div className="mt-4 text-red-600 text-center">{typeError}</div>
          )}
          {uploadStatus && (
            <div className="mt-4 text-green-600 text-center">{uploadStatus}</div>
          )}
        </form>

        {/* View data */}
        <div className="overflow-auto w-full">
          {excelData && excelData.length > 0 ? (
            <table className="min-w-full bg-white shadow-md rounded-lg w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key} className="py-2 px-4 text-left">{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((row, index) => (
                  <tr key={index} className="border-b last:border-none">
                    {Object.keys(row).map((key) => (
                      <td key={key} className="py-2 px-4 text-gray-700">{row[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-500">No file uploaded yet or file is empty!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadViewExcelSheets;
