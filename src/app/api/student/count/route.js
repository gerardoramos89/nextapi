import connectDB from "@/lib/dbConnect";
import { StudentModel } from "@/models/Student";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  
  try {
    // Contar el número de documentos en la colección de estudiantes
    const count = await StudentModel.countDocuments();
    
    // Devolver el conteo en formato JSON
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error counting students' }, { status: 500 });
  }
};
