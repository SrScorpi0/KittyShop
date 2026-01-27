import { useEffect, useMemo, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import HeaderMobile from './components/HeaderMobile';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Home from './components/Home';
import { products, type CartItem, type Product } from './data/products';

const DEFAULT_CATEGORY = 'todos';
const CART_STORAGE_KEY = 'kittyshop-cart';

export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState(DEFAULT_CATEGORY);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored) as CartItem[];
    } catch {
      return [];
    }
  });

  const visibleProducts = useMemo(() => {
    if (activeCategoryId === DEFAULT_CATEGORY) {
      return products;
    }
    return products.filter((product) => product.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems],
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setHasPurchased(false);
    }
  }, [cartItems]);

  function handleAddToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (!existing) {
        return [...prev, { ...product, quantity: 1 }];
      }
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  }

  function handleRemoveFromCart(productId: string) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function handleClearCart() {
    setCartItems([]);
  }

  function handlePurchase() {
    setCartItems([]);
    setHasPurchased(true);
  }

  function ShopLayout() {
    return (
      <div className="wrapper">
        <HeaderMobile />
        <Sidebar
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
          cartCount={cartCount}
        />
        <Outlet />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ShopLayout />}>
        <Route
          path="/productos"
          element={<Main products={visibleProducts} onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/carrito"
          element={
            <Cart
              items={cartItems}
              hasPurchased={hasPurchased}
              onRemoveItem={handleRemoveFromCart}
              onClear={handleClearCart}
              onPurchase={handlePurchase}
            />
          }
        />
        <Route
          path="/producto/:id"
          element={<ProductDetail products={products} onAddToCart={handleAddToCart} />}
        />
      </Route>
    </Routes>
  );
}
