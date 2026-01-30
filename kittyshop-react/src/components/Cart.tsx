import { useEffect, useMemo, useState } from 'react';
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
  const [touched, setTouched] = useState<{ phone: boolean; address: boolean }>({
    phone: false,
    address: false,
  });
  const [notes, setNotes] = useState('');

  const phoneError = useMemo(() => {
    if (!touched.phone) return '';
    if (!phone.trim()) return 'El telefono es obligatorio';
    if (phone.replace(/\D/g, '').length < 6) return 'Telefono invalido';
    return '';
  }, [phone, touched.phone]);

  const addressError = useMemo(() => {
    if (!touched.address) return '';
    if (!address.trim()) return 'La direccion es obligatoria';
    return '';
  }, [address, touched.address]);

  const canSubmit =
    items.length > 0 && !phoneError && !addressError && phone.trim() && address.trim();

  useEffect(() => {
    const stored = localStorage.getItem('kittyshop-checkout');
    if (stored) {
      try {
        const data = JSON.parse(stored) as { phone?: string; address?: string; message?: string; notes?: string };
        setPhone(data.phone || '');
        setAddress(data.address || '');
        setMessage(data.message || '');
        setNotes(data.notes || '');
      } catch {
        // ignore invalid data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'kittyshop-checkout',
      JSON.stringify({ phone, address, message, notes }),
    );
  }, [phone, address, message, notes]);

  async function handleSubmitOrder() {
    if (!canSubmit) {
      setTouched({ phone: true, address: true });
      return;
    }
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
          notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Error al enviar el pedido');
      }

      setStatus('success');
      localStorage.removeItem('kittyshop-checkout');
      setPhone('');
      setAddress('');
      setMessage('');
      setNotes('');
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
              <div className="carrito-resumen">
                <h4>Resumen del pedido</h4>
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      {item.title} x{item.quantity} - ${item.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="carrito-resumen-total">Total: ${total}</p>
              </div>
              <div className="carrito-formulario-grid">
                <label>
                  Telefono
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                    placeholder="Tu telefono"
                  />
                  {phoneError && <span className="carrito-error">{phoneError}</span>}
                </label>
                <label>
                  Direccion
                  <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
                    placeholder="Tu direccion"
                  />
                  {addressError && <span className="carrito-error">{addressError}</span>}
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
              <label>
                Notas (opcional)
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Indicaciones extra"
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
                  disabled={status === 'loading' || !canSubmit}
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar pedido'}
                </button>
              </div>
            </div>
            {status === 'error' && (
              <p className="carrito-error">{errorMessage}</p>
            )}
            {status === 'success' && (
              <p className="carrito-success">Pedido enviado correctamente.</p>
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
