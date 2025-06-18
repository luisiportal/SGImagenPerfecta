import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col md:flex-row md:justify-center md:items-start gap-4">
        {/* Contact Information - Takes more width */}
        <div className="w-full md:w-4/5 text-center md:text-left">
          <p className="text-lg font-semibold mb-2">Contáctanos</p>
          <a
            href="http://maps.google.com/?q=Calle Holguín #7 entre Rastro y Camilo Cienfuegos, Holguín, Cuba"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start mb-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-2 text-gray-400"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            <p className="text-sm">
              Calle Holguín #7 entre Rastro y Camilo Cienfuegos
            </p>
          </a>
          <div className="flex items-center justify-center md:justify-start mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6.75a.75.75 0 00.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">Lunes - Sábado 9:00 a. m. - 5:00 p. m.</p>
          </div>
          <a
            href="mailto:otradimensioncuba@gmail.com"
            className="flex items-center justify-center md:justify-start text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M20.25 6A4.5 4.5 0 0015.75 1.5h-7.5A4.5 4.5 0 003.75 6v.75A.75.75 0 013 7.5v.75c0 .088.026.17.07.242L12 14.25l8.93-5.758a1.5 1.5 0 01.07-.242V7.5c0-.414-.336-.75-.75-.75h-.75V6z" />
            </svg>
            <span className="text-sm">otradimensioncuba@gmail.com</span>
          </a>
          <a
            href="tel:+5354802155"
            className="flex items-center justify-center md:justify-start text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="text-sm">+53 54802155</span>
          </a>
        </div>

        {/* Social Media Links - Takes less width */}
        <div className="w-full md:w-1/5 text-center md:text-left">
          <p className="text-lg font-semibold mb-2">Síguenos</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://www.facebook.com/estudiootradimension/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/otradimensioncuba/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-800 py-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Estudio Fotográfico Otra Dimensión.
          Todos los derechos reservados. Holguín, Cuba
        </p>
      </div>
    </footer>
  );
};

export default Footer;
