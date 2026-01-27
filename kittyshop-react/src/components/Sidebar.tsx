import { NavLink, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';

type SidebarProps = {
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  cartCount: number;
};

export default function Sidebar({
  activeCategoryId,
  onSelectCategory,
  cartCount,
}: SidebarProps) {
  const navigate = useNavigate();

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
                    onSelectCategory(category.id);
                    navigate('/productos');
                  }}
                >
                  <i className={iconClass} />
                  {category.label}
                </button>
              </li>
            );
          })}
          <li>
            <NavLink
              className={({ isActive }) =>
                `boton-menu boton-carrito${isActive ? ' active' : ''}`
              }
              to="/carrito"
            >
              <i className="bi bi-cart-fill" />
              Carrito <span id="numerito" className="numerito">{cartCount}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <footer>
        <p className="texto-footer">© 2025 Axel Rion</p>
      </footer>
    </aside>
  );
}
