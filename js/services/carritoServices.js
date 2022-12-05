const urlBase = "https://localhost:7233/api";

export const getCarrito = (idCliente,callback) => {
    var url = `${urlBase}/Carrito/${idCliente}`;
    fetch(url)
        .then(response => {
            return [response.status,response.json()]
        })
        .then(data => {
            data[1].then(res => {
                return [data[0],res]
            })
            .then(data => {
                callback(data)
            })
        })
}

export const agregarCarrito = (idCliente, idProduct, cantidad, callback) => {
    var url = `${urlBase}/Carrito`;

    let data ={
        "clientId": idCliente,
        "productId": idProduct,
        "amount": cantidad
    }
    fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return [response.status,response.json()]
    })
    .then(data => {
        data[1].then(res => {
            return [data[0],res]
        })
        .then(data => {
            callback(data)
        })
    })
}

export const eliminarProductoCarrito = (idCliente, idProduct, callback) => {
    var url = `${urlBase}/Carrito/${idCliente}/${idProduct}`;
    fetch(url,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return [response.status,response.json()]
    })
    .then(data => {
        data[1].then(res => {
            return [data[0],res]
        })
        .then(data => {
            callback(data)
        })
    })
}


export const EditarCarrito = (idCliente, idProduct, cantidad, callback) => {
    var url = `${urlBase}/Carrito`;
    
    let data ={
        "clientId": idCliente,
        "productId": idProduct,
        "amount": cantidad
    }

    fetch(url,{
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return [response.status,response.json()]
    })
    .then(data => {
        data[1].then(res => {
            return [data[0],res]
        })
        .then(data => {
            callback(data)
        })
    })
}