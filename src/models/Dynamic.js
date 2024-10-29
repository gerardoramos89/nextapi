import mongoose from 'mongoose';

// Esquema dinámico que acepta cualquier estructura de datos
const DynamicSchema = new mongoose.Schema({}, { strict: false });

const DynamicModel = mongoose.models.Dynamic || mongoose.model('Dynamic', DynamicSchema);

export default DynamicModel;
