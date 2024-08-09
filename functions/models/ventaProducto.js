import mongoose, { mongo } from "mongoose";
import { type } from "os";
var { Schema } = mongoose;

const VentaProductoSchema = new Schema({
  cantidad:Number,
  producto:{
    type: Schema.Types.ObjectId,
    ref:'Producto'
  }
});

module.exports = mongoose.model('VentaProducto',VentaProductoSchema);