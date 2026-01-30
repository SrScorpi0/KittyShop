import { useState } from 'react';
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
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmitOrder() {
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          phone,
          address,
          message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Error al enviar el pedido');
      }

      setStatus('success');
      onPurchase();
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el pedido');
    }
  }

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

            <div className="carrito-formulario">
              <h3>Datos para envio</h3>
              <div className="carrito-formulario-grid">
                <label>
                  Telefono
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Tu telefono"
                  />
                </label>
                <label>
                  Direccion
                  <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Tu direccion"
                  />
                </label>
              </div>
              <label>
                Mensaje
                <textarea
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Algo que quieras agregar"
                />
              </label>
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
                  onClick={handleSubmitOrder}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar pedido'}
                </button>
              </div>
            </div>
            {status === 'error' && (
              <p className="carrito-error">{errorMessage}</p>
            )}
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
