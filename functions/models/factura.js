'use strict'
import mongoose from "mongoose";
var { Schema } = mongoose;

var FacturaSchema = new Schema(
  {
    Version: String,
    FormaPago: String,
    Serie: String,
    Folio: String,
    Fecha: String,
    MetodoPago: String,
    Sello: String,
    NoCertificado: String,
    Certificado: String,
    CondicionesDePago: String,
    SubTotal: String,
    Descuento: String,
    Moneda: String,
    TipoCambio: String,
    Total: String,
    TipoDeComprobante: String,
    Exportacion: String,
    LugarExpedicion: String,
    Emisor: {
      Rfc: String,
      Nombre: String,
      RegimenFiscal: String
    },
    Receptor: {
      Rfc: String,
      Nombre: String,
      DomicilioFiscalReceptor: String,
      RegimenFiscalReceptor: String,
      UsoCFDI: String
    },
    Conceptos: [
      {
        ClaveProdServ: String,
        NoIdentificacion: String,
        Cantidad: String,
        ClaveUnidad: String,
        Unidad: String,
        Descripcion: String,
        ValorUnitario: String,
        Importe: String,
        Descuento: String,
        ObjetoImp: String,
        Impuestos: {
          Traslados: [
            {
              Base: String,
              Importe: String,
              Impuesto: String,
              TasaOCuota: String,
              TipoFactor: Tasa
            }
          ],
          Retenciones: [
            {
              Base: String,
              Importe: String,
              Impuesto: String,
              TasaOCuota: String,
              TipoFactor: String
            }
          ]
        }
      }
    ],
    Impuestos: {
      TotalImpuestosTrasladados: String,
      TotalImpuestosRetenidos: String,
      Retenciones: [
        {
          Importe: String,
          Impuesto: String
        }
      ],
      Traslados: [
        {
          Base: String,
          Importe: String,
          Impuesto: String,
          TasaOCuota: String,
          TipoFactor: String
        }
      ]
    }
  }
);

module.exports = mongoose.model('Factura',FacturaSchema);