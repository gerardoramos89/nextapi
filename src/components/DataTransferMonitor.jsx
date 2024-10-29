"use client";

import { useState, useEffect } from "react";

const DataTransferMonitor = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transferTime, setTransferTime] = useState(null);

  useEffect(() => {
    const fetchStudentCount = async () => {
      setLoading(true);
      const startTime = performance.now(); // Iniciar el cronómetro

      try {
        const response = await fetch('/api/student/count');
        const data = await response.json();

        const endTime = performance.now(); // Finalizar el cronómetro
        const timeTaken = (endTime - startTime).toFixed(2); // Tiempo en milisegundos
        setTransferTime(timeTaken);

        setCount(data.count);
      } catch (error) {
        console.error('Error fetching student count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto my-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        Data Transfer Monitor
      </h2>
      
      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <>
          <p className="text-gray-700 text-lg text-center mb-2">
            Student Count: <strong>{count}</strong>
          </p>
          <p className="text-gray-500 text-lg text-center">
            Data Transfer Time: <strong>{transferTime} ms</strong>
          </p>
        </>
      )}
    </div>
  );
};

export default DataTransferMonitor;
