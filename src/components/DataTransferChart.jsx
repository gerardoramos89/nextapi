"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar componentes para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataTransferChart = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transferTimes, setTransferTimes] = useState([]);
  const [labels, setLabels] = useState([]);
  
  const fetchStudentCount = async () => {
    const startTime = performance.now(); // Iniciar cronómetro

    try {
      const response = await fetch('/api/student/count');
      const data = await response.json();

      const endTime = performance.now(); // Terminar cronómetro
      const timeTaken = (endTime - startTime).toFixed(2); // Tiempo en milisegundos
      setTransferTimes((prev) => [...prev, timeTaken]); // Almacena cada tiempo de transferencia
      setLabels((prev) => [...prev, `Query ${prev.length + 1}`]); // Etiqueta para cada consulta

      setCount(data.count);
    } catch (error) {
      console.error('Error fetching student count:', error);
    }
  };

  useEffect(() => {
    setLoading(false);
    fetchStudentCount();
    // Simulación de múltiples consultas con intervalo
    // const interval = setInterval(() => {
    //   fetchStudentCount();
    // }, 5000); // Ejecuta cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: labels, // Nombres de las consultas (e.g., "Consulta 1", "Consulta 2", etc.)
    datasets: [
      {
        label: 'Data Transfer Time (ms)',
        data: transferTimes, // Tiempos de transferencia
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Data Transfer Time for Student API',
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto my-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        Data Transfer Monitor
      </h2>
      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <>
          <p className="text-gray-700 text-lg text-center mb-4">
            Student Count: <strong>{count}</strong>
          </p>
          <Bar data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default DataTransferChart;
