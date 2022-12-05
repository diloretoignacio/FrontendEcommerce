const urlBase = "https://localhost:7233/api";

export const getProductsByName = (nombre, sort, callback) => {
    var url = `${urlBase}/Productos?name=${nombre}&sort=${sort}`;
    fetch(url)
        .then(response => response.json())
        .then(body => {
            callback(body)
        })
}