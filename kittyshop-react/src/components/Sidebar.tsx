import { categories } from '../data/categories';

type SidebarProps = {
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  cartCount: number;
  onSelectCart: () => void;
  onSelectShop: () => void;
  isCartActive?: boolean;
};

export default function Sidebar({
  activeCategoryId,
  onSelectCategory,
  cartCount,
  onSelectCart,
  onSelectShop,
  isCartActive = false,
}: SidebarProps) {
  return (
    <aside>
      <button className="close-menu" id="close-menu" type="button">
        <i className="bi bi-x" />
      </button>
      <header>
        <img className="logo" src="/img/Logo/Logo.png" alt="AmiKittyShop" />
      </header>
      <nav>
        <ul className="menu">
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id;
            const iconClass = category.id === 'todos'
              ? 'bi bi-hand-index-thumb-fill'
              : 'bi bi-hand-index-thumb';
            const buttonClass = `boton-menu boton-categoria${isActive ? ' active' : ''}`;

            return (
              <li key={category.id}>
                <button
                  id={category.id}
                  className={buttonClass}
                  type="button"
                  onClick={() => {
                    onSelectShop();
                    onSelectCategory(category.id);
                  }}
                >
                  <i className={iconClass} />
                  {category.label}
                </button>
              </li>
            );
          })}
          <li>
            <button
              className={`boton-menu boton-carrito${isCartActive ? ' active' : ''}`}
              type="button"
              onClick={onSelectCart}
            >
              <i className="bi bi-cart-fill" />
              Carrito <span id="numerito" className="numerito">{cartCount}</span>
            </button>
          </li>
        </ul>
      </nav>
      <footer>
        <p className="texto-footer">© 2025 Axel Rion</p>
      </footer>
    </aside>
  );
}
