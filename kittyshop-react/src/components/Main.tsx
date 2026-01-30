import type { Product } from '../data/products';
import ProductCard from './ProductCard';

type MainProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  sortBy: 'recent' | 'price-asc' | 'price-desc';
  onSortByChange: (value: 'recent' | 'price-asc' | 'price-desc') => void;
};

export default function Main({
  products,
  onAddToCart,
  searchQuery,
  onSearchQueryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
}: MainProps) {
  const title = products[0]?.categoryName ?? 'Todos los productos';
  const filteredProducts = products;

  return (
    <main>
      <h2 className="titulo-principal" id="titulo-principal">{title}</h2>
      <div className="mb-6 hidden flex-col gap-4 md:flex md:flex-row md:items-end md:justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Buscar
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Buscar productos"
            className="rounded-lg border border-pink-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Precio min</label>
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => onMinPriceChange(event.target.value)}
              placeholder="0"
              className="w-full sm:w-28 rounded-lg border border-pink-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Precio max</label>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => onMaxPriceChange(event.target.value)}
              placeholder="10000"
              className="w-full sm:w-28 rounded-lg border border-pink-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Ordenar</label>
            <select
              value={sortBy}
              onChange={(event) => onSortByChange(event.target.value as MainProps['sortBy'])}
              className="w-full sm:w-44 rounded-lg border border-pink-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="recent">Recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
      </div>
      <div id="contenedor-productos" className="contenedor-productos">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-gray-500">No hay productos que coincidan con la búsqueda.</p>
      )}
    </main>
  );
}
