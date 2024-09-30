import mongoose from "mongoose";
var { Schema } = mongoose;

const VentaSchema = new Schema({
  id:String,
  ventaProducto:[{
    cantidad:Number,
    producto:{
      type: Schema.Types.ObjectId,
      ref:"Producto"
    }
  }],
  fechaVenta:Date,
  iva:Number,
  subTotal:Number,
  total:Number,
  descuento:Number,
  noTicket:String,
  formaPago:String,
  cajero:String,
  efectivo:Number,
  cambio:Number,
  banco:String,
  noAprobacion:String,
  noTransaccion:String,
  isDevolucion:Boolean,
  isFacturado: Boolean,
  fechaFacturado: Date,
  sucursal:String
});

module.exports = mongoose.model('Venta', VentaSchema);