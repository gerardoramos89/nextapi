"use client"; // Asegúrate de que esto esté al principio del archivo

import { useEffect, useState } from "react";
import Link from "next/link";
import BtnDeleteCVS from "./BtnDeleteCVS";

const ShowExcel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/uploadexcel', { cache: "no-store" });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        const jsonData = await response.json();
        console.log("Data fetched:", jsonData); // Verifica aquí la estructura de jsonData
        setData(jsonData);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;

  if (data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {data.data.map((element) => (
        <div key={element._id} className="p-3 shadow-lg shadow-indigo-500/50 flex flex-col justify-between gap-4 items-start bg-white rounded-lg">
          <div>
            <h2 className="font-bold text-2xl text-slate-700">{element.uploadDate}</h2>
            <p>{element.identifier}</p>
          </div>
          <div className="flex mt-4 space-x-3">
            {/* <Link
              href={`/edit/${element._id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none"
            >
              Update
            </Link> */}
            <BtnDeleteCVS id={element._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowExcel;
