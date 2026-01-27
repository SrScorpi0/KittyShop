import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="transition-all duration-300 w-full">
      <header className="bg-white text-gray-900 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src="/img/Logo/Logo.png" alt="Logo" className="h-[80px] w-[80px]" />
              <span className="text-xl font-bold text-pink-500">AmiKittyShop</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-gray-700 hover:text-pink-500 transition-colors font-bold">
                Home
              </Link>
              <Link
                to="/productos"
                className="text-gray-700 hover:text-pink-500 transition-colors font-bold"
              >
                Productos
              </Link>
              <a
                href="#nosotros"
                className="text-gray-700 hover:text-pink-500 transition-colors font-bold"
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                className="text-gray-700 hover:text-pink-500 transition-colors font-bold"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex gap-2">
                <button className="px-4 py-2 text-pink-500 hover:text-pink-600 border border-pink-200 rounded-lg hover:border-pink-300 transition-colors">
                  Login
                </button>
                <button className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors">
                  Sign Up
                </button>
              </div>
              <button className="md:hidden p-2 text-gray-700 hover:text-pink-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5h16M4 12h16M4 19h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-16">
      <section className="bg-pink-50 py-20 flex justify-center">
        <div className="w-full max-w-6xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
                Cosillas bellas de Hello Kitty
              </h1>
              <p className="text-lg text-gray-600">
                Descubre nuestra colección de cerámicas, toallones y detalles únicos.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/productos"
                  className="px-6 py-3 bg-pink-400 text-white rounded-lg font-semibold hover:bg-pink-500 transition-colors"
                >
                  Ver productos
                </Link>
                <a
                  href="#contacto"
                  className="px-6 py-3 border border-pink-200 text-pink-500 rounded-lg font-semibold hover:border-pink-300 hover:text-pink-600 transition-colors"
                >
                  Contactanos
                </a>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <img
                src="/img/Ceramicas/ceramica-01.jpg"
                alt="Productos Kitty"
                className="w-full object-contain rounded-lg shadow-lg border border-pink-100 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="nosotros" className="py-24 bg-pink-50 flex justify-center">
        <div className="w-full max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Nosotros
          </h2>
          <div className="px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6 text-lg tracking-tight">
              <div className="bg-pink-50 rounded-lg shadow-lg p-6 border border-pink-100">
                <div className="flex flex-row">
                  <div className="pl-2 pr-6">
                    <div className="flex w-12 h-12 rounded-md bg-pink-400 text-white items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 pb-2">Detalles únicos</h3>
                    <p className="text-gray-700">
                      Diseños especiales con inspiración kawaii para tus espacios favoritos.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 rounded-lg shadow-lg p-6 border border-pink-100">
                <div className="flex flex-row">
                  <div className="pl-2 pr-6">
                    <div className="flex w-12 h-12 rounded-md bg-pink-400 text-white items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 pb-2">Calidad y cariño</h3>
                    <p className="text-gray-700">
                      Selección cuidada de materiales para que cada producto dure más.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 rounded-lg shadow-lg p-6 border border-pink-100">
                <div className="flex flex-row">
                  <div className="pl-2 pr-6">
                    <div className="flex w-12 h-12 rounded-md bg-pink-400 text-white items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 pb-2">Diseño con intención</h3>
                    <p className="text-gray-700">
                      Estilos modernos y suaves que combinan con tu hogar.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 rounded-lg shadow-lg p-6 border border-pink-100">
                <div className="flex flex-row">
                  <div className="pl-2 pr-6">
                    <div className="flex w-12 h-12 rounded-md bg-pink-400 text-white items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 pb-2">Amado por clientes</h3>
                    <p className="text-gray-700">
                      Nos encanta crear cosas bonitas que te acompañen en el día a día.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 bg-pink-50 flex justify-center">
        <div className="w-full max-w-6xl px-6 flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Contactanos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Alguna pregunta o comentario que quieras dejarnos?
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-12">
            <div className="w-full max-w-2xl p-8 border-2 border-pink-200 rounded-2xl bg-white">
              <form className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    placeholder=" "
                    className="peer w-full p-4 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-colors"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-4 text-gray-500 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-sm peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-pink-500"
                  >
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    className="peer w-full p-4 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-colors"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-4 text-gray-500 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-sm peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-pink-500"
                  >
                    Your Email
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    rows={4}
                    placeholder=" "
                    className="peer w-full p-4 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-colors resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-4 text-gray-500 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-sm peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-pink-500"
                  >
                    Your Message
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-400 text-white p-4 rounded-lg font-semibold hover:bg-pink-500 transition-colors text-lg"
                >
                  Enviar
                </button>
              </form>
            </div>
            <div className="text-center w-full max-w-4xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Other ways to reach us</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-pink-400 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-white" width="24" height="24" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">hola@amikittyshop.com</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-pink-400 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-white" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-pink-400 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-white" width="24" height="24" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">123 Business St, City, State 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      <footer className="bg-gray-800 text-white py-12 flex justify-center">
        <div className="w-full max-w-6xl px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="/img/Logo/Logo.png" alt="Logo" className="h-[30px] w-[30px] flex-shrink-0" />
                <h3 className="text-xl font-bold">AmiKittyShop</h3>
              </div>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                Detalles suaves y lindos para tu hogar, inspirados en un estilo kawaii.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base lg:text-lg">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/productos" className="hover:text-white transition-colors text-sm lg:text-base">Catalogo</Link></li>
                <li><a href="#nosotros" className="hover:text-white transition-colors text-sm lg:text-base">Nosotros</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors text-sm lg:text-base">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base lg:text-lg">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#nosotros" className="hover:text-white transition-colors text-sm lg:text-base">About</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors text-sm lg:text-base">Blog</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors text-sm lg:text-base">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base lg:text-lg">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#contacto" className="hover:text-white transition-colors text-sm lg:text-base">Help Center</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors text-sm lg:text-base">Contact</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors text-sm lg:text-base">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 lg:mt-12 pt-8 text-center text-gray-400">
            <p className="text-sm lg:text-base">© 2025 AmiKittyShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
