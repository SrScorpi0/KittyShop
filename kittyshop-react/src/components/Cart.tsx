import type { CartItem } from '../data/products';

type CartProps = {
  items: CartItem[];
  hasPurchased: boolean;
  onRemoveItem: (productId: string) => void;
  onClear: () => void;
  onPurchase: () => void;
};

export default function Cart({
  items,
  hasPurchased,
  onRemoveItem,
  onClear,
  onPurchase,
}: CartProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isEmpty = items.length === 0 && !hasPurchased;

  return (
    <main>
      <h2 className="titulo-principal">Carrito</h2>
      <div className="contenedor-carrito">
        {isEmpty && (
          <p id="carrito-vacio" className="carrito-vacio">
            Tu carrito esta vacio. <i className="bi bi-emoji-frown" />
          </p>
        )}

        {!isEmpty && !hasPurchased && (
          <>
            <div id="carrito-productos" className="carrito-productos">
              {items.map((item) => (
                <div key={item.id} className="carrito-producto">
                  <img
                    className="carrito-producto-imagen"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>{item.quantity}</p>
                  </div>
                  <div className="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${item.price}</p>
                  </div>
                  <div className="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${item.price * item.quantity}</p>
                  </div>
                  <button
                    className="carrito-producto-eliminar"
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <i className="bi bi-trash-fill" />
                  </button>
                </div>
              ))}
            </div>

            <div id="carrito-acciones" className="carrito-acciones">
              <div className="carrito-acciones-izquierda">
                <button
                  id="carrito-acciones-vaciar"
                  className="carrito-acciones-vaciar"
                  type="button"
                  onClick={onClear}
                >
                  Vaciar carrito
                </button>
              </div>
              <div className="carrito-acciones-derecha">
                <div className="carrito-acciones-total">
                  <p>Total</p>
                  <p id="total">${total}</p>
                </div>
                <button
                  id="carrito-acciones-comprar"
                  className="carrito-acciones-comprar"
                  type="button"
                  onClick={onPurchase}
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </>
        )}

        {hasPurchased && (
          <p id="carrito-comprado" className="carrito-comprado">
            Muchas gracias por tu compra, esperamos que lo disfrutes.{' '}
            <i className="bi bi-emoji-heart-eyes" />
          </p>
        )}
      </div>
    </main>
  );
}
