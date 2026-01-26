export type Product = {
  id: string;
  title: string;
  image: string;
  categoryId: string;
  categoryName: string;
  price: number;
  description: string;
  material: string;
  size: string;
  color: string;
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
    description: 'Ceramica artesanal esmaltada en tonos suaves. Ideal para decorar o regalar.',
    material: 'Ceramica esmaltada',
    size: '20 cm',
    color: 'Rosa pastel',
  },
  {
    id: 'ceramica-02',
    title: 'ceramica 02',
    image: '/img/Ceramicas/ceramica-02.png',
    categoryId: 'ceramicas',
    categoryName: 'Ceramicas',
    price: 1000,
    description: 'Pieza de ceramica con acabado satinado y detalles pintados a mano.',
    material: 'Ceramica satinada',
    size: '18 cm',
    color: 'Crema',
  },
  {
    id: 'toallon-01',
    title: 'toallon 01',
    image: '/img/Toallas/Toallon-01.jpg',
    categoryId: 'toallones',
    categoryName: 'Toallones',
    price: 1000,
    description: 'Toallon de algodon suave y absorbente. Tamano grande para uso diario.',
    material: 'Algodon',
    size: '140 x 70 cm',
    color: 'Blanco',
  },
  {
    id: 'toallon-02',
    title: 'toallon 02',
    image: '/img/Toallas/Toallon-02.jpg',
    categoryId: 'toallones',
    categoryName: 'Toallones',
    price: 1000,
    description: 'Toallon con textura esponjosa y costuras reforzadas.',
    material: 'Algodon peinado',
    size: '150 x 80 cm',
    color: 'Gris claro',
  },
  {
    id: 'toallon-03',
    title: 'toallon 03',
    image: '/img/Toallas/Toallon-03.jpg',
    categoryId: 'toallones',
    categoryName: 'Toallones',
    price: 1000,
    description: 'Toallon liviano y de secado rapido, ideal para gimnasio o playa.',
    material: 'Microfibra',
    size: '120 x 60 cm',
    color: 'Azul',
  },
  {
    id: 'repasador-01',
    title: 'repasador 01',
    image: '/img/Repasadores/repasador-01 .jpg',
    categoryId: 'repasadores',
    categoryName: 'Repasadores',
    price: 1000,
    description: 'Repasador de cocina con tela resistente y diseno clasico.',
    material: 'Algodon',
    size: '50 x 70 cm',
    color: 'Rojo',
  },
  {
    id: 'repasador-02',
    title: 'repasador 02',
    image: '/img/Repasadores/repasador-02 .jpg',
    categoryId: 'repasadores',
    categoryName: 'Repasadores',
    price: 1000,
    description: 'Repasador con textura tipo waffle para mayor absorcion.',
    material: 'Algodon waffle',
    size: '45 x 65 cm',
    color: 'Beige',
  },
  {
    id: 'repasador-03',
    title: 'repasador 03',
    image: '/img/Repasadores/repasador-03 .jpg',
    categoryId: 'repasadores',
    categoryName: 'Repasadores',
    price: 1000,
    description: 'Repasador liviano, facil de lavar y de secado rapido.',
    material: 'Algodon ligero',
    size: '45 x 65 cm',
    color: 'Verde',
  },
];
