import type { Product } from '../data/products';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="producto">
      <img className="producto-imagen" src={product.image} alt={product.title} />
      <div className="producto-detalles">
        <h3 className="producto-titulo">{product.title}</h3>
        <p className="producto-precio">${product.price}</p>
        <button className="producto-agregar" type="button">
          Agregar
        </button>
      </div>
    </div>
  );
}
