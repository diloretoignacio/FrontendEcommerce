import { Header, eventSearch } from "../components/header.js"
import { Footer } from "../components/footer.js"
import { DetalleProducto } from "../components/detalleProducto.js"
import { CompraProducto } from "../components/compraProducto.js"

import { getQueryParams } from "../functions.js"

import { getDetalleProducto } from "../services/productosServices.js"
import { agregarCarrito } from "../services/carritoServices.js"

import { getProductsByName } from "../services/productosServices.js"

import { Card } from "../components/card.js"

var _detalleProducto = document.getElementById("detalleProducto");
var _header = document.getElementById("header");
var _footer = document.getElementById("footer");

getProductsByName("", true, (body) => 
{
    var num = Math.floor(Math.random()*(1-5))+5
    var products = body.slice(num,num+5)
    if(products.length > 0)
    {   
        products.forEach(product => {
            document.getElementById("detalleOtros").innerHTML +=Card(product.productoId, product.nombre, product.precio, product.image) 
        });

        var buttons = document.querySelectorAll('.verDetalle');
        buttons.forEach(button => button.addEventListener('click', event => {
            var id = event.target.getAttribute("data-id");
            window.open(`./detalleProducto.html?id=${id}`,'_self');
        }
        ));
    }
});



export const VerDetalleProductoRender = () =>
{
    _header.innerHTML=Header();
    _footer.innerHTML=Footer();
    eventSearch();
    
    var id = getQueryParams().id
    getDetalleProducto(id,(body) => {
        var detalle = body
        _detalleProducto.innerHTML=DetalleProducto(detalle.id, detalle.nombre, detalle.image, detalle.precio, detalle.descripcion, detalle.marca);
        _detalleProducto.innerHTML+=CompraProducto(detalle.id, detalle.nombre, detalle.image, detalle.precio, detalle.descripcion, detalle.marca);
        
        var _response = document.getElementById("response");
        document.getElementById("restar").addEventListener('click', event => {
            if(parseInt(document.getElementById("valorCantidad").innerHTML) <= 1)
            {
                alertify.error('La cantidad NO puede ser menor a 1', 'error', 5);
            }
            else
            {
                document.getElementById("valorCantidad").innerHTML= parseInt(document.getElementById("valorCantidad").innerHTML)-1
            }
        })

        document.getElementById("sumar").addEventListener('click', event => {
            document.getElementById("valorCantidad").innerHTML= parseInt(document.getElementById("valorCantidad").innerHTML)+1
        })

        document.getElementById("agregarCarrito").addEventListener('click', event => {
            var cantidad = parseInt(document.getElementById("valorCantidad").innerHTML);
            var idCliente = 1;
            var productoId = detalle.productoId
            
            agregarCarrito(idCliente, productoId, cantidad, (res) => {
                if(res[0]===201)
                {
                    alertify.success('Producto agregado al carrito correctamente');
                }
                else
                {
                    if(res[0]===409)
                    {
                        alertify.error(res[1].message)
                    }   
                    else{
                        alertify.error("Ha ocurrido un error con el servidor")
                    }
                }
            });
        })


        document.getElementById("comprar").addEventListener('click', event => {
            
            var cantidad = parseInt(document.getElementById("valorCantidad").innerHTML);
            var idCliente = 1;
            var productoId = detalle.productoId

            agregarCarrito(idCliente, productoId, cantidad, (body) => {
                var products = body
                window.open(`./miCarrito.html?id=1`,'_self');
            });
        })
    });
}
