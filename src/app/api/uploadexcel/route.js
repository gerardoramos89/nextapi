import connectDB from "@/lib/dbConnect";
import UploadExcel from '@/models/UploadExcel'; // Asegúrate de que este modelo esté correctamente definido
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  await connectDB(); // Conectar a la base de datos

  try {
      const { metadata, records } = await req.json(); // Obtener el cuerpo de la solicitud
      console.log("Datos recibidos:", { metadata, records }); // Para depuración

      // Asegúrate de proporcionar un valor para identifier
      const newUpload = new UploadExcel({
          uploadId: uuidv4(),
          uploadDate: new Date(),
          identifier: uuidv4(), // O cualquier otro valor que necesites
          metadata: {
              fileName: metadata.fileName,
              fileType: metadata.fileType,
              size: metadata.size,
          },
          content: records,
      });

      await newUpload.save(); // Guardar en la base de datos
      return NextResponse.json({ message: 'Archivo guardado en MongoBD exitosamente' }, { status: 201 });
  } catch (error) {
      console.error('Error al guardar los datos en la base de datos:', error);
      return NextResponse.json({ error: 'Error al procesar la solicitud', details: error.message }, { status: 500 });
  }
};

export const GET = async () => {
    await connectDB(); // Conectar a la base de datos

    try {
        const results = await UploadExcel.find({}); // Obtener todos los registros
        return NextResponse.json({ data: results }, { status: 200 });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return NextResponse.json({ error: 'Error al obtener los datos', details: error.message }, { status: 500 });
    }
};
