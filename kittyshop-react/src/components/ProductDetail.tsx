import { useEffect, useRef, useState } from 'react';
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
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);

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

  function goPrev() {
    setIsImageTransitioning(true);
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }

  function goNext() {
    setIsImageTransitioning(true);
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  }

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const currentX = event.touches[0]?.clientX ?? 0;
    touchDeltaX.current = currentX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null) return;
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
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
      <div className="producto-detalle">
        <div className="producto-detalle-izquierda">
          <button
            className="producto-imagen-boton"
            type="button"
            onClick={openZoom}
            aria-label="Ver imagen en pantalla completa"
          >
            <img
              className={`producto-imagen-grande${isImageTransitioning ? ' cambiando' : ''}`}
              src={activeImage}
              alt={product.title}
              onLoad={() => setIsImageTransitioning(false)}
              onError={() => setIsImageTransitioning(false)}
            />
          </button>

          <div
            className="producto-galeria"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="producto-galeria-control"
              type="button"
              onClick={goPrev}
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
                  onClick={() => {
                    if (index !== activeImageIndex) {
                      setIsImageTransitioning(true);
                    }
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={src} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
            <button
              className="producto-galeria-control"
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
            >
              <i className="bi bi-chevron-right" />
            </button>
          </div>

          <div className="producto-detalle-acciones">
            <button
              className="rounded-full bg-pink-400 px-5 py-2 font-semibold text-white transition hover:bg-pink-500"
              type="button"
              onClick={() => onAddToCart(product)}
            >
              Agregar al carrito
            </button>
            <Link
              className="rounded-full border-2 border-pink-400 px-5 py-2 font-semibold text-pink-500 transition hover:bg-pink-400 hover:text-white"
              to="/"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>

        <div className="producto-detalle-derecha">
          <h3 className="producto-titulo text-lg font-bold text-pink-500">
            {product.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
              Material: {product.material}
            </span>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">
              Tamano: {product.size}
            </span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
              Color: {product.color}
            </span>
          </div>
          <div className="h-px w-full bg-black/10" />
          <p className="producto-descripcion">{product.description}</p>
          <p className="producto-precio text-lg font-bold text-pink-600">${product.price}</p>
          <p className="text-sm">
            <strong>Categoria:</strong> {product.categoryName}
          </p>
          <p className="text-sm">
            <strong>SKU:</strong> {product.id}
          </p>
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
