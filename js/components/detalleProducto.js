export const DetalleProducto = (id, nombre, image, precio, descipcion, marca) => `
<div id="producto">
    <div id = "imagen">
        <img src = "${image}" class="image">
    </div>
</div>
<div id = "detalle">
    <div id = "titulo">
        ${nombre}
    </div>
    <div id = "precio">
        $${precio}
    </div>
    <div id = "detalle">
        ${descipcion}
        <div class = "marca">
            Marca: ${marca}
        </div>
        <div class = "cuotas extra" >
        <ion-icon name="card-outline" class="extra"></ion-icon> 12 Cuotas sin interes
        </div>
        <div class = "envios extra">
        <ion-icon name="cube-outline"></ion-icon> Envios gratis a el país
        </div>
    </div>
</div>
`