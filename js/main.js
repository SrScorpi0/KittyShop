// PRODUCTOS
const productos = [
    // Ceramicas
    {
        id: "ceramica-01",
        titulo: "ceramica 01",
        imagen: "/img/Ceramicas/ceramica-01.jpg",
        categoria: {
            nombre: "Ceramicas",
            id: "ceramicas"
        },
        precio: 1000
    },
    {
        id: "ceramica-02",
        titulo: "ceramica 02",
        imagen: "/img/Ceramicas/ceramica-02.png",
        categoria: {
            nombre: "Ceramicas",
            id: "ceramicas"
        },
        precio: 1000
    },

      // Toallones
    {
        id: "toallon-01",
        titulo: "toallon 01",
        imagen: "/img/Toallas/Toallon-01.jpg",
        categoria: {
            nombre: "Toallones",
            id: "toallones"
        },
        precio: 1000
    },
    {
        id: "toallon-02",
        titulo: "toallon 02",
        imagen: "/img/Toallas/Toallon-02.jpg",
        categoria: {
            nombre: "Toallones",
            id: "toallones"
        },
        precio: 1000
    },
    {
        id: "toallon-03",
        titulo: "toallon 03",
        imagen: "/img/Toallas/Toallon-03.jpg",
        categoria: {
            nombre: "Toallones",
            id: "toallones"
        },
        precio: 1000
    },
      // Repasadores
    {
        id: "repasador-01",
        titulo: "repasador 01",
        imagen: "/img/Repasadores/repasador-01 .jpg",
        categoria: {
            nombre: "Repasadores",
            id: "repasadores"
        },
        precio: 1000
    },
    {
        id: "repasador-02",
        titulo: "repasador 02",
        imagen: "/img/Repasadores/repasador-02 .jpg",
        categoria: {
            nombre: "Repasadores",
            id: "repasadores"
        },
        precio: 1000
    },
    {
        id: "repasador-03",
        titulo: "repasador 03",
        imagen: "/img/Repasadores/repasador-03 .jpg",
        categoria: {
            nombre: "Repasadores",
            id: "repasadores"
        },
        precio: 1000
    },
    
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarproductos(productosElegidos) {

    contenedorProductos.innerHTML= "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `        
            <img class="producto-imagen" src="${producto.imagen}" alt="">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();

}

cargarproductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));        
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarproductos(productosBoton);
        }
        else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarproductos(productos);
        }

        
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    }); 

}
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)
    }
    
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}   