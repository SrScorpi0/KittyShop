import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Divider, Group, Stack, Text } from '@mantine/core';
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
            <Button color="pink" radius="xl" onClick={() => onAddToCart(product)}>
              Agregar al carrito
            </Button>
            <Button
              component={Link}
              to="/"
              variant="outline"
              color="pink"
              radius="xl"
            >
              Volver a la tienda
            </Button>
          </div>
        </div>

        <div className="producto-detalle-derecha">
          <Stack gap="xs">
            <Text className="producto-titulo" size="lg" fw={700}>
              {product.title}
            </Text>
            <Group gap="xs" wrap="wrap">
              <Badge variant="filled" color="pink">
                Material: {product.material}
              </Badge>
              <Badge variant="filled" color="grape">
                Tamano: {product.size}
              </Badge>
              <Badge variant="filled" color="indigo">
                Color: {product.color}
              </Badge>
            </Group>
            <Divider />
            <Text className="producto-descripcion">{product.description}</Text>
            <Text className="producto-precio" fw={700}>
              ${product.price}
            </Text>
            <Text size="sm">
              <strong>Categoria:</strong> {product.categoryName}
            </Text>
            <Text size="sm">
              <strong>SKU:</strong> {product.id}
            </Text>
          </Stack>
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
