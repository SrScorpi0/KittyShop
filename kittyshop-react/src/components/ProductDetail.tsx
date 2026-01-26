import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Product } from '../data/products';

type ProductDetailProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ProductDetail({ products, onAddToCart }: ProductDetailProps) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isZoomClosing, setIsZoomClosing] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (isZoomClosing) {
      timer = window.setTimeout(() => {
        setIsZoomClosing(false);
        setIsZoomOpen(false);
      }, 200);
    }
    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [isZoomClosing]);

  function openZoom() {
    setIsZoomOpen(true);
  }

  function closeZoom() {
    setIsZoomClosing(true);
  }

  if (!product) {
    return (
      <main>
        <h2 className="titulo-principal">Producto no encontrado</h2>
        <p>El producto que buscas no existe.</p>
        <Link className="boton-menu" to="/">
          Volver a la tienda
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h2 className="titulo-principal">{product.title}</h2>
      <div className="producto-detalle">
        <div className="producto-detalle-izquierda">
          <button
            className="producto-imagen-boton"
            type="button"
            onClick={openZoom}
            aria-label="Ver imagen en pantalla completa"
          >
            <img className="producto-imagen-grande" src={product.image} alt={product.title} />
          </button>

          <div className="producto-detalle-acciones">
            <button
              className="producto-agregar"
              type="button"
              onClick={() => onAddToCart(product)}
            >
              Agregar al carrito
            </button>
            <Link className="producto-volver" to="/">
              Volver a la tienda
            </Link>
          </div>
        </div>

        <div className="producto-detalle-derecha">
          <h3 className="producto-titulo">{product.title}</h3>
          <div className="producto-badges">
            <span className="badge">Material: {product.material}</span>
            <span className="badge">Tamano: {product.size}</span>
            <span className="badge">Color: {product.color}</span>
          </div>
          <div className="producto-separador" />
          <p className="producto-descripcion">{product.description}</p>
          <p className="producto-precio">${product.price}</p>
          <div className="producto-detalle-meta">
            <p><strong>Categoria:</strong> {product.categoryName}</p>
            <p><strong>SKU:</strong> {product.id}</p>
          </div>
        </div>
      </div>

      {(isZoomOpen || isZoomClosing) && (
        <div
          className={`producto-zoom-overlay${isZoomClosing ? ' cerrando' : ' abierto'}`}
          role="dialog"
          aria-modal="true"
          onClick={closeZoom}
        >
          <img
            className="producto-zoom-imagen"
            src={product.image}
            alt={product.title}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            className="producto-zoom-cerrar"
            type="button"
            onClick={closeZoom}
            aria-label="Cerrar imagen"
          >
            <i className="bi bi-x" />
          </button>
        </div>
      )}
    </main>
  );
}
