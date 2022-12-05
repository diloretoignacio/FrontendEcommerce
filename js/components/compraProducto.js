export const CompraProducto = (id, nombre, image, precio, descipcion) => `
<div id = "compraProducto">
    <div>
        <div id = "cantidad">
            Cantidad: <button class="btnMasMenos"id="restar">-</button> <label id="valorCantidad"> 1 </label> <button class="btnMasMenos" id="sumar">+</button>
            <button id="comprar">Comprar Ahora</button>
            <button id="agregarCarrito"> Agregar al carrito </button>
            <div id="response"> </div>
        </div>
    </div>
</div>
`