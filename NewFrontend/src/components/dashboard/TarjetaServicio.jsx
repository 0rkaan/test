import { Link } from 'react-router-dom';

export default function TarjetaServicio({ title, description, icon, route }) {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <div className="bg-primary rounded-full p-3 mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 text-center mb-6">{description}</p>
          <Link
            to={route}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}