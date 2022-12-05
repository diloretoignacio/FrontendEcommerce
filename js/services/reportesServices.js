const urlBase = "https://localhost:7233/api";

export const getReporte = (desde, hasta, callback) => {
    var url = `${urlBase}/Orden?from=${desde}&to=${hasta}`;
    fetch(url)
        .then(response => response.json())
        .then(body => {
            callback(body)
        })
}