const urlBase = "https://localhost:7233/api";

export const generarOrden = (idCliente, callback) => {
    var url = `${urlBase}/Orden/${idCliente}`;
    fetch(url,{
        method: 'POST',
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