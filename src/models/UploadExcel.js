import mongoose from "mongoose";

const uploadExcelSchema = new mongoose.Schema(
  {
    uploadId: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      required: true,
    },
    identifier: { // Asegúrate de tener este campo si es necesario
      type: String,
      required: true, // Si es requerido, asegúrate de proporcionarlo
    },
    metadata: {
      fileName: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
    },
    content: {
      type: Array, // O ajusta según la estructura que necesitas
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.UploadExcel || mongoose.model("UploadExcel", uploadExcelSchema);
