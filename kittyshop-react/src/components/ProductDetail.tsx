import { Link, useParams } from 'react-router-dom';
import type { Product } from '../data/products';

type ProductDetailProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ProductDetail({ products, onAddToCart }: ProductDetailProps) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

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
      <div className="contenedor-productos">
        <div className="producto">
          <img className="producto-imagen" src={product.image} alt={product.title} />
          <div className="producto-detalles">
            <h3 className="producto-titulo">{product.title}</h3>
            <p className="producto-precio">${product.price}</p>
            <button className="producto-agregar" type="button" onClick={() => onAddToCart(product)}>
              Agregar
            </button>
            <Link className="boton-menu" to="/">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
