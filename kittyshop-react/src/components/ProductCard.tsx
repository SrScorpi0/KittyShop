import { useNavigate } from 'react-router-dom';
import type { Product } from '../data/products';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div className="producto producto-clickable" onClick={() => navigate(`/producto/${product.id}`)}>
      <img className="producto-imagen" src={product.image} alt={product.title} />
      <div className="producto-detalles">
        <h3 className="producto-titulo">{product.title}</h3>
        <p className="producto-precio">${product.price}</p>
        <button
          className="producto-agregar"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAddToCart(product);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
