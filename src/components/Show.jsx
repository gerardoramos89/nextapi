import Link from "next/link";
import BtnDelete from "./BtnDelete";

const getData = async () => {
  try {
    const response = await fetch(`${process.env.URI}`, { cache: "no-store" });
    return response.json();
  } catch (error) {
    console.log("Error : ", error);
  }
};

//Para ver todos los documentos que estan en ATLAS en la consola de VSC
//const {data} = await getData()
//console.log(data);

const Show = async () => {
  const { data } = await getData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {data.map((element) => (
        <div key={element._id} className="p-3 shadow-lg shadow-indigo-500/50 flex flex-col justify-between gap-4 items-start bg-white rounded-lg">
         {/* Contenido de la tarjeta */}
        <div>
          <h2 className="font-bold text-2xl text-slate-700">
            {element.name}
          </h2>
          <p>{element.age}</p>
        </div>

        {/* Botones de acciones */}
        <div className="flex mt-4 space-x-3">
          <Link
            href={`/edit/${element._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none"
          >
            Update
          </Link>
          <BtnDelete id={element._id} />
        </div>
      </div>
      ))}
    </div>
  );
};

export default Show;
