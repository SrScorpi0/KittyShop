export type Product = {
  id: string;
  title: string;
  image: string;
  categoryId: string;
  categoryName: string;
  price: number;
};

export type Category = {
  id: string;
  label: string;
};

export type CartItem = Product & {
  quantity: number;
};

export const products: Product[] = [
  {
    id: 'ceramica-01',
    title: 'ceramica 01',
    image: '/img/Ceramicas/ceramica-01.jpg',
    categoryId: 'ceramicas',
    categoryName: 'Ceramicas',
    price: 1000,
  },
  {
    id: 'ceramica-02',
    title: 'ceramica 02',
    image: '/img/Ceramicas/ceramica-02.png',
    categoryId: 'ceramicas',
    categoryName: 'Ceramicas',
    price: 1000,
  },
  {
    id: 'toallon-01',
    title: 'toallon 01',
    image: '/img/Toallas/Toallon-01.jpg',
    categoryId: 'toallones',
    categoryName: 'Toallones',
    price: 1000,
  },
  {
    id: 'toallon-02',
    title: 'toallon 02',
    image: '/img/Toallas/Toallon-02.jpg',
    categoryId: 'toallones',
    categoryName: 'Toallones',
    price: 1000,
  },
  {
    id: 'toallon-03',
    title: 'toallon 03',
    image: '/img/Toallas/Toallon-03.jpg',
    categoryId: 'toallones',
    categoryName: 'Toallones',
    price: 1000,
  },
  {
    id: 'repasador-01',
    title: 'repasador 01',
    image: '/img/Repasadores/repasador-01 .jpg',
    categoryId: 'repasadores',
    categoryName: 'Repasadores',
    price: 1000,
  },
  {
    id: 'repasador-02',
    title: 'repasador 02',
    image: '/img/Repasadores/repasador-02 .jpg',
    categoryId: 'repasadores',
    categoryName: 'Repasadores',
    price: 1000,
  },
  {
    id: 'repasador-03',
    title: 'repasador 03',
    image: '/img/Repasadores/repasador-03 .jpg',
    categoryId: 'repasadores',
    categoryName: 'Repasadores',
    price: 1000,
  },
];
