const productos = [
    { id: 1, nombre: "Bufanda otoñal", precio: 50 },
    { id: 2, nombre: "Boina", precio: 50 },
    { id: 3, nombre: "Botas Cafés", precio: 50 },
    { id: 4, nombre: "Otras botas Cafés :V", precio: 50 }
];

let carrito = [];

function agregarAlCarrito(idProducto) {
    let producto = productos.find(p => p.id === idProducto);
    
    let itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    renderizarCarrito();
}

function limpiarCarrito() {
    carrito.length = 0;
    renderizarCarrito();
}
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. ¡Añade algunas prendas otoñales primero!");
        return;
    }

    const totalFinal = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);

    alert(`¡Gracias por su compra!\n\nEl monto total a pagar es: Q${totalFinal.toFixed(2)}\nEsperamos que disfrute sus prendas de GangaWeb.`);

    limpiarCarrito();
}

function renderizarCarrito() {
    let contenedor = document.getElementById('contenedor-carrito');
    let totalElemento = document.getElementById('total-carrito');
    
    contenedor.innerHTML = '';
    
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío</p>';
        totalElemento.innerHTML = '<strong>Total: Q0.00</strong>';
        return;
    }

    let totalAcumulado = 0;

    carrito.forEach(item => {
        let subtotal = item.precio * item.cantidad;
        totalAcumulado += subtotal;

        let div = document.createElement('div');
        div.classList.add('item-carrito');
        div.innerHTML = `
            <p style="text-align: left; margin: 5px 0;">
                ${item.nombre} - Q${item.precio} x ${item.cantidad} = <strong>Q${subtotal}</strong>
            </p>
        `;
        contenedor.appendChild(div);
    });

    totalElemento.innerHTML = `<strong>Total: Q${totalAcumulado.toFixed(2)}</strong>`;
}