import mongoose from "mongoose";
var { Schema } = mongoose;

const ProductoSchema = new Schema({
  id: String,
  codigoBarras: String,
  descripcion: String,
  seVendePor: String,
  precioCosto: Number,
  ganancia: Number,
  precioVenta: Number,
  precioMayoreo: Number,
  especialidad: String,
  proveedor: Number, // aqui puede cambiara un objecto
  usaInventario: Boolean,
  existencia: Number,
  minimo:Number,
  maximo: Number,
  lote: String,
  caducidad: Date,
  isRecetaRequerida:Boolean,
  isActivo:Boolean
});

module.exports = mongoose.model('Producto',ProductoSchema);
