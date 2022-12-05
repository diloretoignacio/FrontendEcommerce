export const Header = () => {
    return `  
    <nav class="menu">
        <ul>
            <li> <a href="./index.html"> <ion-icon name="storefront-outline"></ion-icon> Compu Space </a></li>
            <li> <a href="./index.html"> Inicio </a></li>
            <li> <a href="./reportes.html"> Reportes </a></li>
            <li> <a href="./miCarrito.html?id=1"> Mi Carrito </a></li>
        </ul>
        <div class="search">
            <input type="text" placeholder="Buscar producto" id="txtInput">
            <label id="searchButton"> <ion-icon name="search-outline"></ion-icon> </label>
        </div>
    </nav>`
}

export const Search = () => {
    document.getElementById("searchButton").addEventListener('click', event => {
        var nombreProducto = document.getElementById("txtInput").value
        window.open(`./index.html?nombreProducto=${nombreProducto}`,'_self');
    });
}

export const eventSearch = () => {
    var txtInput = document.getElementById('txtInput'); 
    txtInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            window.open(`./index.html?nombreProducto=${txtInput.value}`,'_self');
        }
    });
}







