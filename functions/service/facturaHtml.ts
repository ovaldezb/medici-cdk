import { Concepto } from "../models/concepto";
import { Factura } from "../models/factura";

const  facturaHtml = ()=>{
  return {
    generaHtml:(satResponse:any, datosFactura:Factura)=>{
      let productosLista = '';
      datosFactura.Conceptos.forEach((prod:Concepto)=>{
        let row = "      <tr>"+
                  "        <td class='prod-compra'>"+prod.Cantidad+"</td>"+
                  "        <td class='prod-compra'>"+prod.ClaveUnidad+"</td>"+
                  "        <td class='prod-compra'>"+prod.Unidad+"</td>"+
                  "        <td class='prod-compra'>"+prod.ClaveProdServ+"</td>"+
                  "        <td class='prod-compra'>"+prod.ObjetoImp+"</td>"+
                  "        <td class='prod-compra'>"+prod.Descripcion+"</td>"+
                  "        <td class='prod-compra'>"+prod.ValorUnitario+"</td>"+
                  "        <td class='prod-compra'>"+Number(Number(prod.Cantidad)*Number(prod.ValorUnitario)).toFixed(2)+"</td>"+
                  "      </tr>";
            productosLista += row;
          });
      const pageHeader = ""+
            "<html>"+
            " <head>"+
            "   <style>"+
            "     @page {"+
            "      size: Letter portrait;"+
            "      margin: 0;"+
            "     }"+
            "     .row1{"+
            "      text-align: center;"+
            "      background-color: rgb(212, 230, 244);"+
            "      font-family: 'Courier New', Courier, monospace;"+
            "     }"+
            "     .row2{"+
            "       text-align: center;"+
            "       font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"+
            "       font-size: small;"+
            "     }"+
            "     .prod-compra{"+
            "       text-align: center;"+
            "       font-family: 'Courier New', Courier, monospace;"+
            "       font-size: small;"+
            "     }"+
            "     .prod-compra-qty{"+
            "      text-align: right;"+
            "      font-family: 'Courier New', Courier, monospace;"+
            "      font-size: medium;"+
            "      border-top: 1px dashed black;"+
            "    }"+
            "    .prod-compra-total{"+
            "      text-align: right;"+
            "      font-family: 'Courier New', Courier, monospace;"+
            "      font-size: medium;"+
            "    }"+
            "    .round-back-left{"+
            "      display:table-cell;"+
            "      border-radius: 15px 0px 0px 15px;"+
            "      background: rgb(51, 153, 97);"+
            "      color: white;"+
            "      border: 1px solid white;"+
            "      text-align: center;"+
            "      font-size: small;"+
            "    }"+
            "    .round-back-center{"+
            "      display:table-cell; "+
            "      border-radius: 0px 0px 0px 0px;"+
            "      background: rgb(51, 153, 97);"+
            "      color: white;"+
            "      border: 1px solid white;"+
            "      text-align: center;"+
            "      font-size: small;"+
            "    }"+
            "    .round-back-right{"+
            "      display:table-cell; "+
            "      border-radius: 0px 15px 15px 0px;"+
            "      background: rgb(51, 153, 97);"+
            "      color: white;"+
            "      text-align: center;"+
            "      font-size: small;"+
            "    }"+
            "    .round-back-row{"+
            "      border-radius: 15px 15px 10px 10px;"+
            "      background: rgb(51, 153, 97);"+
            "      border: 5px solid white;"+
            "    }"+
            "    .main-table{"+
            "      width: 95%;"+
            "      margin: auto;"+
            "    }"+
            "  </style>"+
            "</head>"+
            "<header>"+
            "  <label style='font-size: 10px;margin-left: 40px;'>COMPROBANTE FISCAL DIGITAL A TRAVÉS DE INTERNET</label>"+
            "  <table class='main-table'>"+
            "    <tr>"+
            "      <td style='text-align: center;'>"+
            "        <img src=' data:image/png;base64,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' alt='' width='60'/>"+
            "      </td>"+
            "      <td style='text-align: right;'>"+
            "        <table style='width: 80%;margin-left:30%;'>"+
            "          <colgroup>"+
            "            <col width='40%'/>"+
            "            <col width='60%'/>"+
            "          </colgroup>"+
            "          <tr>"+
            "            <td style='font-size: small;text-align: center;'>Folio Fiscal</td>"+
            "            <td style='font-size: small;text-align: center;'>"+satResponse.uuid+"</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td class='row1'>Serie</td>"+
            "            <td class='row1'>Folio</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td class='row2'>"+datosFactura.Serie+"</td>"+
            "            <td class='row2'>"+datosFactura.Folio+"</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td colspan='2' class='row1'>Fecha y Hora</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td colspan='2' class='row2'>"+datosFactura.Fecha+"</td>"+
            "          </tr>"+
            "        </table>"+
            "      </td>"+
            "    </tr>"+
            "  </table>"+
            "</header>"+
            "<body>"+
            "  <table class='main-table'>"+
            "    <colgroup>"+
            "      <col width='40%'/>"+
            "      <col width='60%'/>"+
            "    </colgroup>"+
            "    <tr>"+
            "      <td class='round-back-left'>Datos Fiscales del Cliente</td>"+
            "      <td class='round-back-right'>Datos del Comprobante</td>"+
            "    </tr>"+
            "    <tr>"+
            "      <td>"+
            "        <table style='width:100%;'>"+
            "          <tr>"+
            "            <td style='font-size: small;'>RFC:</td>"+
            "            <td style='font-size: 12px;'>"+datosFactura.Receptor.Rfc+"</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td style='font-size: small;'>Razón Social:</td>"+
            "            <td style='font-size: 12px;'>"+datosFactura.Receptor.Nombre+"</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td style='font-size: small;'>Regime Fiscal:</td>"+
            "            <td style='font-size: 12px;'>"+datosFactura.Receptor.RegimenFiscalReceptor+"</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td style='font-size: small;'>Dimicilio Fiscal</td>"+
            "            <td style='font-size: 12px;'>"+datosFactura.Receptor.DomicilioFiscalReceptor+"</td>"+
            "          </tr>"+
            "        </table>"+
            "      </td>"+
            "      <td>"+
            "        <table style='width:100%;'>"+
            "          <tr>"+
            "            <td style='font-size: small;'>Tipo de Comprobante</td>"+
            "            <td style='font-size: small;'>Factura</td>"+
            "            <td style='font-size: small;'>Moneda</td>"+
            "            <td style='font-size: small;'>"+datosFactura.Moneda+"</td>"+
            "            <td style='font-size: small;'>Tipo de Cambio</td>"+
            "            <td style='font-size: small;'>"+datosFactura.TipoCambio+"</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td style='font-size: small;'>Clave Comprobante</td>"+
            "            <td style='font-size: small;'>"+datosFactura.TipoDeComprobante+"</td>"+
            "            <td style='font-size: small;'>Exportacion</td>"+
            "            <td colspan='3' style='font-size: small;'>"+datosFactura.Exportacion+"</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td style='font-size: small;'>Uso del CFDI</td>"+
            "            <td style='font-size: 10px;'>"+datosFactura.Receptor.UsoCFDI+"</td>"+
            "            <td style='font-size: small;'>Método de Pago:</td>"+
            "            <td colspan='3' style='font-size: small;'>"+datosFactura.MetodoPago+"</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td style='font-size: small;'>Condiciones de Pago:</td>"+
            "            <td style='font-size: small;'>"+datosFactura.CondicionesDePago+"</td>"+
            "            <td style='font-size: small;'>Forma de Pago</td>"+
            "            <td style='font-size: small;' colspan='3'>"+datosFactura.FormaPago+"</td>"+
            "          </tr>"+
            "        </table>"+
            "      </td>"+
            "    </tr>"+
            "  </table>"+
            "  <div class='main-table'>"+
            "    <hr/>"+
            "  </div>"+
            "  <table class='main-table'>"+
            "      <colgroup>"+
            "      <col width='10%'/>"+
            "      <col width='10%'/>"+
            "      <col width='10%'/>"+
            "      <col width='10%'/>"+
            "      <col width='10%'/>"+
            "      <col width='10%'/>"+
            "      <col width='20%'/>"+
            "      <col width='20%'/>"+
            "      </colgroup>   "+
            "      <tr>"+
            "        <td class='round-back-left'>Cant.</td>"+
            "        <td class='round-back-center'>Clave U.</td>"+
            "        <td class='round-back-center'>Unidad</td>"+
            "        <td class='round-back-center'>Clave P.</td>"+
            "        <td class='round-back-center'>Objecto Imp.</td>"+
            "        <td class='round-back-center'>Descripción</td>"+
            "        <td class='round-back-center'>P. Unitario</td>"+
            "        <td class='round-back-right'>Importe</td>"+
            "      </tr>"+
            productosLista+
            "      <tr>"+
            "        <td></td>"+
            "        <td></td>"+
            "        <td></td>"+
            "        <td></td>"+
            "        <td></td>"+
            "        <td></td>"+
            "        <td></td>"+
            "        <td></td>"+
            "      </tr>"+
            "  </table>"+
            "  <table class='main-table'>"+
            "    <colgroup>"+
            "      <col width='80%'/>"+
            "      <col width='20%'/>"+
            "    </colgroup>"+
            "    <tr>"+
            "      <td class='prod-compra-total'>Sub Total:</td>"+
            "      <td class='prod-compra-qty'>"+datosFactura.SubTotal+"</td>"+
            "    </tr>"+
            "    <tr>"+
            "      <td class='prod-compra-total'>IVA</td>"+
            "      <td class='prod-compra-qty'></td>"+
            "    </tr>"+
            "    <tr>"+
            "      <td class='prod-compra-total'>Total</td>"+
            "      <td class='prod-compra-qty'>"+datosFactura.Total+"</td>"+
            "    </tr>"+
            "  </table>"+
            "  <div class='main-table'>"+
            "    <hr/>"+
            "  </div>"+
            "  <table class='main-table'>"+
            "    <colgroup><col width='25%'/><col width='15%'/><col width='35%'/><col width='25%'/> </colgroup>"+
            "    <tr>"+
            "      <td style='text-align: right;font-size:small;'>Lugar de expedición:</td>"+
            "      <td style='text-align: left;font-size:small;'>"+datosFactura.LugarExpedicion+"</td>"+
            "      <td style='text-align: right;font-size:small;'>Régimen Fiscal:</td>"+
            "      <td style='text-align: left;font-size:small;'>"+datosFactura.Emisor.RegimenFiscal+"</td>"+
            "    </tr>"+
            "  </table>"+
            "  <div class='main-table'>"+
            "    <hr/>"+
            "  </div>  "+
            "  <table class='main-table'>"+
            "    <tr>"+
            "      <td style='font-size: small;color: rgb(98, 168, 239);'>Cadena Original del Complemento de Certificación Digital del SAT</td>"+
            "    </tr>"+
            "    <tr>"+
            "      <td style='font-size: 10px;'>"+satResponse.cadenaOriginalSAT+"</td>"+
            "    </tr>"+
            "  </table>"+
            "  <div class='main-table'>"+
            "    <hr/>"+
            "  </div>"+
            "  <table class='main-table'>"+
            "    <tr>"+
            "      <td style='font-size: small;color: rgb(98, 168, 239);'>Sello digital del Emisor</td>"+
            "    </tr>"+
            "    <tr>"+
            "      <td style='font-size: 10px;'>"+satResponse.selloCFDI+"</td>"+
            "    </tr>"+
            "  </table>"+
            "  <div class='main-table'>"+
            "    <hr/>"+
            "  </div>"+
            "  <table class='main-table'>"+
            "    <colgroup>"+
            "      <col width='20%'/>"+
            "      <col width='80%'/>"+
            "    </colgroup>"+
            "    <tr>"+
            "      <td style='text-align: center;'>"+
            "        <img src='data:image/png;base64,"+satResponse.qrCode+"' width='140' alt=''/>"+
            "      </td>"+
            "      <td>"+
            "        <table>"+
            "          <tr>"+
            "            <td style='font-size: small;color: rgb(98, 168, 239);'>Folio Fiscal:</td>"+
            "            <td style='font-size: small;'>"+satResponse.uuid+"</td>"+
            "            <td style='font-size: small;color: rgb(98, 168, 239);'>Certificado SAT</td>"+
            "            <td style='font-size: small;'>"+satResponse.noCertificadoSAT+"</td>"+
            "          </tr>"+
            "       </table>"+
            "       <table>"+
            "          <tr>"+
            "            <td style='font-size: small;color: rgb(98, 168, 239);'>Fecha y Hora de Certificación:</td>"+
            "            <td style='font-size: small;'>"+satResponse.fechaTimbrado+"</td>"+
            "            <td style='font-size: small;color: rgb(98, 168, 239);'>RFC Proveedor de Certificación:</td>"+
            "            <td style='font-size: small;'>SW Sapien</td>"+
            "          </tr>"+
            "       </table>"+
            "       <table>"+
            "          <tr>"+
            "            <td colspan='4' style='font-size: small;color: rgb(98, 168, 239);'>Sello digital SAT</td>"+
            "          </tr>"+
            "          <tr>"+
            "            <td colspan='4' style='font-size: 10px;'>"+satResponse.selloSAT+"</td>"+
            "          </tr>"+
            "        </table>"+
            "      </td>"+
            "    </tr>"+
            "  </table>"+
            "</body>"+
            "</html>";
      return pageHeader;
    }
  }
}

module.exports = facturaHtml;