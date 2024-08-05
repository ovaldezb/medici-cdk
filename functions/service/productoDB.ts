import mongoose from "mongoose";
const Producto = require('../models/producto')

const productoDB = (mongoUri: string)=>{
  mongoose.connect(mongoUri);
  return{
    save:(producto:any)=>{
      return new Producto({
        codigoBarras: producto.codigoBarras,
        descripcion: producto.descripcion,
        seVendePor: producto.seVendePor,
        precioCosto: producto.precioCosto,
        ganancia: producto.ganancia,
        precioVenta: producto.precioVenta,
        precioMayoreo: producto.precioMayoreo,
        especialidad: producto.especialidad,
        proveedor: producto.proveedor,
        usaInventario: producto.usaInventario,
        existencia: producto.existencia,
        minimo: producto.minimo,
        maximo: producto.maximo,
        lote: producto.lote,
        caducidad: producto.caducidad,
        isActivo: producto.isActivo
      })
      .save()
      .then((productoSaved:any)=>{
        return {producto:productoSaved}
      })
      .catch((err:any) => {
        console.log(err);
        return {error: err};
      })
    },
    findProductoByDesc:(descTxt:string)=>{
      return Producto.find({descripcion:{$regex:'^'+descTxt, $options:'i'}})
      .then((listaProductos:any)=>{
        return {productos:listaProductos}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    },
    findProductoByCodigoBarras:(codigoBarras:number)=>{
      return Producto.findOne({codigoBarras:codigoBarras})
      .then((productoFound:any)=>{
        return { producto:productoFound}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    },
    updateProducto:(idProducto:string,producto:any)=>{
      return Producto.findOneAndUpdate({_id:idProducto}, producto,{new:true})
      .then((productoUpdated:any)=>{
        return {producto:productoUpdated};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    deleteProducto:(idProducto:string)=>{
      const producto = Producto.findOne({_id:idProducto});
      producto.isActivo = false;
      Producto.findOneAndUpdate({_id:idProducto},producto,{new:true})
      .then((productoDeleted:any)=>{
        return{producto:productoDeleted};
      })
      .catch((err:any)=>{
        return {error:err};
      })
    }
  };
}
module.exports = productoDB;