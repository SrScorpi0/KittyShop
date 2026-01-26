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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  const gallery = product?.images?.length ? product.images : product ? [product.image] : [];
  const activeImage = gallery[activeImageIndex] ?? product?.image;

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
      <div className="producto-detalle">
        <div className="producto-detalle-izquierda">
          <button
            className="producto-imagen-boton"
            type="button"
            onClick={openZoom}
            aria-label="Ver imagen en pantalla completa"
          >
            <img className="producto-imagen-grande" src={activeImage} alt={product.title} />
          </button>

          <div className="producto-galeria">
            <button
              className="producto-galeria-control"
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
              }
              aria-label="Imagen anterior"
            >
              <i className="bi bi-chevron-left" />
            </button>
            <div className="producto-galeria-lista">
              {gallery.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  className={`producto-galeria-item${index === activeImageIndex ? ' activa' : ''}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={src} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
            <button
              className="producto-galeria-control"
              type="button"
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % gallery.length)}
              aria-label="Imagen siguiente"
            >
              <i className="bi bi-chevron-right" />
            </button>
          </div>

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
            src={activeImage}
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
