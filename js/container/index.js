import { Card } from "../components/card.js"
import { Header, eventSearch } from "../components/header.js"
import { Footer } from "../components/footer.js"

import { getQueryParams } from "../functions.js"
import { getProductsByName } from "../services/productosServices.js"

var _root = document.getElementById("root");
var _header = document.getElementById("header");
var _footer = document.getElementById("footer");

export const IndexRender = () => {
    _header.innerHTML=Header();
    _footer.innerHTML=Footer();
    eventSearch();
    
    var _sinResultados = document.getElementById("sinResultados");
    var select = document.getElementById("select");
    var nombreProducto = getQueryParams().nombreProducto;
    var sort = getQueryParams().sort;

    if(sort === undefined)
    {
        sort = false;
    }
    select.value = sort;
    
    select.addEventListener('change', (event) => {
        window.open(`./index.html?sort=${event.target.value}`,'_self');
    });

    if(nombreProducto === undefined)
    {
        nombreProducto = ""
    }
    getProductsByName(nombreProducto, sort, (body) => 
    {
        var products = body
        if(products.length > 0)
        {   
            orden.classList.remove("hide");
            products.forEach(product => {
                _root.innerHTML +=Card(product.productoId, product.nombre, product.precio, product.image) 
            });
    
            var buttons = document.querySelectorAll('.verDetalle');
            buttons.forEach(button => button.addEventListener('click', event => {
                var id = event.target.getAttribute("data-id");
                window.open(`./detalleProducto.html?id=${id}`,'_self');
            }
            ));
        }
        else
        {
            orden.classList.add("hide");
            _sinResultados.innerHTML = "No se han encontrado resultados para los datos ingresados";
        }
    });   
}