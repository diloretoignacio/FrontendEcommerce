import { Header, eventSearch } from "../components/header.js"
import { Footer } from "../components/footer.js"
import { Reporte } from "../components/reporte.js"

import { getReporte } from "../services/reportesServices.js"

var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var _bodyTable = document.getElementById("bodyTable");

export const ReportesRender = () =>
{
    _header.innerHTML=Header();
    _footer.innerHTML=Footer();
    _bodyTable.innerHTML="";
    eventSearch();
    document.getElementById("total").innerHTML=`Total: $0`;

    document.getElementById("buscar").addEventListener('click', event => {
        _bodyTable.innerHTML=""
        var desde = document.getElementById("desde").value;
        var hasta = document.getElementById("hasta").value;

        console.log(desde,hasta)
        getReporte(desde,hasta,(body) => {
            var ventas = body.orders
            console.log(ventas)
            ventas.forEach(venta => {
                const date = new Date(venta.fecha);
                var li= ""
                venta.productos.forEach(producto => {
                    li = `${li} <li class="itemProducto"> ${producto.producto.nombre} (${producto.cantidad}) $${producto.producto.precio} </li>`
                });
                var productos = `<ul class"productos">${li}</ul>`
                
                _bodyTable.innerHTML+=Reporte(date.toISOString().substring(0, 10),venta.clienteId, productos, venta.productos.length, venta.total)
            });
            document.getElementById("total").innerHTML=`Total: $${body.recaudacion}`;
        });
    });   
}
