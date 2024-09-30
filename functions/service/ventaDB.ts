import mongoose from "mongoose";
const TicketVenta = require('../models/ticketVenta');
const Venta = require('../models/venta');
const Producto = require('../models/producto');
const EntradaEfectivo = require('../models/entradaEfectivo');
const SalidaEfectivo = require('../models/salidaEfectivo');
const ventaDB = (mongoUri: string)=>{
  mongoose.connect(mongoUri);
  return {
    getTicket:()=>{
      return TicketVenta.findOneAndUpdate({sucursal:'SUC001'},{$inc:{numero:1}},{new:true})
      .then((ticket:any)=>{
        return {ticket:ticket};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    saveVenta:(venta:any)=>{
      return new Venta({
        ventaProducto :venta.ventaProducto,
        fechaVenta    :venta.fechaVenta,
        iva           :venta.iva,
        subTotal      :venta.subTotal,
        total         :venta.total,
        formaPago     :venta.formaPago,
        descuento     :venta.descuento,
        noTicket      :venta.noTicket,
        cajero        :venta.cajero,
        efectivo      :venta.efectivo,
        cambio        :venta.cambio,
        banco         :venta.banco,
        noAprobacion  :venta.noAprobacion,
        noTransaccion :venta.noTransaccion,
        isDevolucion  :venta.isDevolucion,
        isFacturado   :venta.isFacturado,
        sucursal      :venta.sucursal,
        fechaFacturado:null
      })
      .save()
      .then((ventaSaved:any)=>{
        return {venta:ventaSaved};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    updateExistencia:(ventaProd:any)=>{
      return Producto.findOneAndUpdate({_id:ventaProd.producto._id},{$inc:{existencia:ventaProd.cantidad*-1}},{new:true})
      .then((productoUpdate:any)=>{
        return {producto:productoUpdate};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    saveEntrada:(entradaEfectivo:any)=>{
      return new EntradaEfectivo({
        cantidad:entradaEfectivo.cantidad,
        comentario: entradaEfectivo.comentario,
        sucursal: entradaEfectivo.sucursal,
        fechaEntrada: entradaEfectivo.fechaEntrada
      })
      .save()
      .then((entradaSaved:any)=>{
        return {entradaEfectivo:entradaSaved};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    },
    saveSalida:(salidaEfectivo:typeof SalidaEfectivo)=>{
      return new SalidaEfectivo({
        cantidad:salidaEfectivo.cantidad,
        comentario: salidaEfectivo.comentario,
        sucursal: salidaEfectivo.sucursal,
        fechaSalida: salidaEfectivo.fechaSalida
      })
      .save()
      .then((salidaSaved:any)=>{
        return {salidaEfectivo:salidaSaved};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    },
    getListaEntradasByDate:(fecha:string, sucursal:string)=>{
      const fechaSplit = fecha.split('-');
      return EntradaEfectivo.find({fechaEntrada: {$gte:fechaSplit[0]+'-'+fechaSplit[1]+'-'+fechaSplit[2]},sucursal:sucursal})
      .then((listEntradas:any)=>{
        return{entradas:listEntradas};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    getListaSalidasByDate:(fecha:string, sucursal:string)=>{
      return SalidaEfectivo.find({fechaSalida: {$gte:fecha},sucursal:sucursal})
      .then((listSalidas:any)=>{
        return{salidas:listSalidas};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    }
  }
}

module.exports = ventaDB;