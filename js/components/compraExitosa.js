export const compraExitosa = (orden, lista) => `
<div id="compraExitosa">    
    <label class="tituloCard"> Compra realizada correctamente </label>
    <div id="descripcion">
        <div class="img">
            <img src="../img/success.png">
        </div>
        <label id="idOrden"> Orden ID: ${orden.ordenId} </label>
        <label id="envio"> Ya estamos preparando tu envio <ion-icon name="cube-outline"></ion-icon> </label>
        <label id="lbProductos"> Productos: </label>
        <div class="productos">
            ${lista}
        </div>
        <div id="total">
            Total: <label id="precioTotal">$${orden.total}</label>
        </div>
    </div>
</div>
`



