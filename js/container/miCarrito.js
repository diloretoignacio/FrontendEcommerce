import { Header, eventSearch } from "../components/header.js"
import { Footer } from "../components/footer.js"
import { ProductoCarrito } from "../components/productoCarrito.js"

import { getQueryParams } from "../functions.js"
import { generarOrden } from "../services/ordenServices.js"
import { getCarrito, EditarCarrito, eliminarProductoCarrito } from "../services/carritoServices.js"


import { compraExitosa } from "../components/compraExitosa.js";

var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var _articulos = document.getElementById("listadoArticulos");
var idCliente = getQueryParams().id

document.getElementById("comprar").addEventListener('click', event => {
    generarOrden(idCliente, (res) => {
        
        console.log(res[1])
        var li= ""
        res[1].productos.forEach(producto => {
            li = `${li} <li class="item"> ${producto.producto.nombre} (${producto.cantidad}) $${producto.producto.precio} </li>`
        });
        if(res[0]===201)
        {
            var lista = `<ul class"productos">${li}</ul>`
            document.getElementById("root").innerHTML = compraExitosa(res[1], lista)
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
    })
})

export const MiCarritoRender = () =>
{   
    _header.innerHTML=Header();
    _footer.innerHTML=Footer();
    _articulos.innerHTML="";
    eventSearch();
    document.getElementById("precioTotal").innerHTML=`$0`;

    
    getCarrito(idCliente,(res) => {
        if(res[0]===200)
        {
            var carritoProductos = res[1].carritoProductos
            var total = 0;
            if(carritoProductos.length === 0 )
            {
                _articulos.innerHTML="No posee productos en el carrito"
                document.getElementById("comprar").disabled=true
            }

            carritoProductos.forEach(element => {
                var product = element.producto;
                total = total+product.precio * element.cantidad;            
                _articulos.innerHTML+=ProductoCarrito(product.productoId, product.nombre, product.precio, element.cantidad, product.image)
            });
            document.getElementById("precioTotal").innerHTML=`$${total}`;

            var buttons = document.querySelectorAll('.eliminar');
            buttons.forEach(function(button)
            {
                button.addEventListener('click', event => {
                    var productoId = event.target.parentNode.getAttribute("data-productoId");
                    console.log(productoId)
                    eliminarProductoCarrito(idCliente, productoId ,(res) => {
                        if(res[0]===200)
                        {
                            alertify.success(res[1].message)
                            MiCarritoRender()
                        }
                        else
                        {
                            alertify.error("Ha ocurrido un error con el servidor");
                        }
                    });
                });
            })

            var buttons = document.querySelectorAll('.sumar');
            buttons.forEach(function(button)
            {
                button.addEventListener('click', event => {
                    var productoId = event.target.getAttribute("data-productoId");
                    var newCantidad = parseInt(document.getElementById(`valorCantidad_${productoId}`).innerHTML)+1; 
                    EditarCarrito(idCliente, productoId, newCantidad ,(res) => {
                        if(res[0]===200)
                        {
                            MiCarritoRender()
                            alertify.success("Carrito actualizado correctamente")
                        }
                        else
                        {
                            alertify.error("Ha ocurrido un error con el servidor")
                        }
                    });
                },true);
            })

            var buttons = document.querySelectorAll('.restar');
            buttons.forEach(function(button)
            {
                button.addEventListener('click', event => {
                    var productoId = event.target.getAttribute("data-productoId");
                    var newCantidad = parseInt(document.getElementById(`valorCantidad_${productoId}`).innerHTML)-1; 
                    if(newCantidad < 1)
                    {
                        alertify.notify('La cantidad NO puede ser menor a 1', 'error', 5);
                    }
                    else
                    {
                        EditarCarrito(idCliente, productoId, newCantidad ,(res) => {
                            MiCarritoRender()
                            alertify.success("Carrito actualizado correctamente")
                        });
                    }        
                });
            })
        }
        else
        {
            if(res[0]===404)
            {
                _articulos.innerHTML="No posee productos en el carrito"
                document.getElementById("comprar").disabled=true
            }  
            else{
                _response.innerHTML=Error("ha ocurrido un error con el servidor");
            }
        }
    });
}
