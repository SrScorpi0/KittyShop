import type { Product } from '../data/products';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="producto">
      <img className="producto-imagen" src={product.image} alt={product.title} />
      <div className="producto-detalles">
        <h3 className="producto-titulo">{product.title}</h3>
        <p className="producto-precio">${product.price}</p>
        <button className="producto-agregar" type="button" onClick={() => onAddToCart(product)}>
          Agregar
        </button>
      </div>
    </div>
  );
}
