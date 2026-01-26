export default function Sidebar() {
  return (
    <aside>
      <button className="close-menu" id="close-menu" type="button">
        <i className="bi bi-x" />
      </button>
      <header>
        <img className="logo" src="/img/Logo/Logo.png" alt="AmiKittyShop" />
      </header>
      <nav>
        <ul className="menu">
          <li>
            <button id="todos" className="boton-menu boton-categoria active" type="button">
              <i className="bi bi-hand-index-thumb-fill" />
              Todos los productos
            </button>
          </li>
          <li>
            <button id="ceramicas" className="boton-menu boton-categoria" type="button">
              <i className="bi bi-hand-index-thumb" />
              Ceramicas
            </button>
          </li>
          <li>
            <button id="toallones" className="boton-menu boton-categoria" type="button">
              <i className="bi bi-hand-index-thumb" />
              Toallones
            </button>
          </li>
          <li>
            <button id="repasadores" className="boton-menu boton-categoria" type="button">
              <i className="bi bi-hand-index-thumb" />
              Repasadores
            </button>
          </li>
          <li>
            <a className="boton-menu boton-carrito" href="/carrito.html">
              <i className="bi bi-cart-fill" />
              Carrito <span id="numerito" className="numerito">0</span>
            </a>
          </li>
        </ul>
      </nav>
      <footer>
        <p className="texto-footer">© 2025 Axel Rion</p>
      </footer>
    </aside>
  );
}
