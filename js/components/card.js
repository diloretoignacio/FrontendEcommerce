export const Card = (id, nombre, precio, image) => `
    <div class = "card">
        <img src = ${image}> 
        <label class="titleCard"> ${nombre} </label>
        <label class="precioCard"> $${precio} </label>
        <div id="buttonCard">
            <button class="verDetalle" id=${id}
            data-id = ${id}>
                Ver detalle
            <button>
        </div> 
    </div>
`
