"use client";

import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const DataTransferLineChart = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transferTimes, setTransferTimes] = useState([]);
  const [labels, setLabels] = useState([]);

  const fetchStudentCount = async () => {
    const startTime = performance.now(); // Iniciar cronómetro
    setLoading(true); // Indica que estamos cargando

    try {
      const response = await fetch('/api/student/count');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Manejar errores HTTP
      }

      const data = await response.json();

      const endTime = performance.now(); // Terminar cronómetro
      const timeTaken = (endTime - startTime).toFixed(2); // Tiempo en milisegundos
      setTransferTimes((prev) => [...prev, timeTaken]); // Almacena cada tiempo de transferencia

      // Obtener la hora actual
      const currentTime = new Date().toLocaleTimeString();
      setLabels((prev) => [...prev, currentTime]); // Etiqueta para cada consulta

      setCount(data.count);
    } catch (error) {
      console.error('Error fetching student count:', error);
      setTransferTimes((prev) => [...prev, 0]); // Almacena 0 si hay un error
      setLabels((prev) => [...prev, new Date().toLocaleTimeString()]); // Agrega la hora en que ocurrió el error
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  useEffect(() => {
    fetchStudentCount();
    // Simulación de múltiples consultas con intervalo
    // const interval = setInterval(() => {
    //   fetchStudentCount();
    // }, 5000); // Ejecuta cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mx-auto my-4 w-full transition-transform duration-500 ease-in-out">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Data Transfer Monitor
      </h2>
      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <>
          <p className="text-gray-700 text-lg text-center mb-4">
            Student Count: <strong>{count}</strong>
          </p>
          <div className="overflow-hidden max-h-80 transition-opacity duration-300 ease-in-out">
            <Plot
              data={[
                {
                  x: labels, // Etiquetas de tiempo
                  y: transferTimes, // Tiempos de transferencia
                  type: 'scatter', // Gráfico de líneas
                  mode: 'lines+markers', // Mostrar líneas y marcadores en los puntos
                  marker: { color: 'rgba(75, 192, 192, 0.6)' },
                  line: { shape: 'linear' },
                },
              ]}
              layout={{
                title: 'Data Transfer Time for Student API',
                xaxis: { title: 'Time', tickangle: -45 }, // Eje X con hora
                yaxis: { title: 'Transfer Time (ms)' },
                showlegend: false,
                paper_bgcolor: '#f8fafc', // Color de fondo del gráfico
                plot_bgcolor: '#ffffff', // Color de fondo de la gráfica
              }}
              config={{ displayModeBar: false }} // Deshabilitar la barra de herramientas
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DataTransferLineChart;
