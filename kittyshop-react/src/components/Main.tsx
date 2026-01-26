import type { Product } from '../data/products';
import ProductCard from './ProductCard';

type MainProps = {
  products: Product[];
};

export default function Main({ products }: MainProps) {
  const title = products[0]?.categoryName ?? 'Todos los productos';

  return (
    <main>
      <h2 className="titulo-principal" id="titulo-principal">{title}</h2>
      <div id="contenedor-productos" className="contenedor-productos">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
