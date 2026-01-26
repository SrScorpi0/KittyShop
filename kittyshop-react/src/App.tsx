import { useMemo, useState } from 'react';
import HeaderMobile from './components/HeaderMobile';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { products } from './data/products';

const DEFAULT_CATEGORY = 'todos';

export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState(DEFAULT_CATEGORY);

  const visibleProducts = useMemo(() => {
    if (activeCategoryId === DEFAULT_CATEGORY) {
      return products;
    }
    return products.filter((product) => product.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  return (
    <div className="wrapper">
      <HeaderMobile />
      <Sidebar
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
      />
      <Main products={visibleProducts} />
    </div>
  );
}
