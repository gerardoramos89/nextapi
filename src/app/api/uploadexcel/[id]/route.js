import connectDB from "@/lib/dbConnect";
import UploadExcel from "@/models/UploadExcel"; // Corrected import
import { NextResponse } from "next/server";

// Mostrar un documento
export const GET = async (request, { params }) => {
  await connectDB();
  const id = params.id;
  try {
    const result = await UploadExcel.findById(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching document:", error.message); // Added error logging
    return NextResponse.json({ data: null }, { status: 500 });
  }
};

// Eliminar un documento
export const DELETE = async (request, { params }) => {
  console.log('DELETE'); // Changed alert to console.log for debugging
  await connectDB();
  const id = params.id;
  try {
    const result = await UploadExcel.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { message: `Document with ID: ${id} not found.` },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error deleting document:", error.message); // Added error logging
    return NextResponse.json({ data: null }, { status: 500 });
  }
};

// Actualizar un documento
export const PUT = async (request, { params }) => {
  await connectDB();
  const id = params.id;
  const body = await request.json();
  try {
    const result = await UploadExcel.findByIdAndUpdate(id, { $set: { ...body } }, { new: true }); // Corrected to UploadExcel
    if (!result) {
      return NextResponse.json({ message: `Document with ID: ${id} not found` }, { status: 404 });
    }
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error updating document:", error.message); // Added error logging
    return NextResponse.json({ data: null }, { status: 500 });
  }
};
