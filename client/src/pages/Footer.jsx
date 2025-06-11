const Footer = () => {
  return (
    <footer className="w-full">
      <div className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Estudio Fotográfico Otra Dimensión.
          Holguín. Cuba
        </p>
      </div>
    </footer>
  );
};

export default Footer;
