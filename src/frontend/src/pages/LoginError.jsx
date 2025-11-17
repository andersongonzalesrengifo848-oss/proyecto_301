import { Link } from "react-router-dom";

export default function LoginError() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-0">
      {/* Navbar */}
      <nav className="w-full bg-green-300 shadow flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-bold text-green-900">EcoTareas: Gestión Inteligente con Impacto Verde</h1>
        <ul className="flex gap-6 text-green-900 font-semibold">
          <li>Inicio</li>
          <li>Tareas</li>
          <li>Perfil</li>
          <li>Configuración</li>
          <li>Ayuda</li>
        </ul>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl">Salir</button>
      </nav>

      {/* Card */}
      <div className="mt-10 bg-white max-w-xl w-full p-8 rounded-2xl shadow-lg border border-green-100">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-4">
          Error de Autenticación
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Hubo un problema al intentar iniciar sesión con Google.<br />
          Por favor, inténtalo de nuevo.
        </p>

        <div className="flex justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow transition"
          >
            Volver a la página de inicio de sesión
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-green-200 mt-10 p-6 text-gray-800 text-sm grid grid-cols-3 gap-4">
        <div>
          <h3 className="font-bold mb-2">Enlaces Rápidos</h3>
          <p>Inicio</p>
          <p>Mis tareas</p>
          <p>Perfil</p>
          <p>Configuración</p>
          <p>Ayuda</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Ayuda</h3>
          <p>Cómo usar ecoTareas</p>
          <p>Seguimiento de actividades</p>
          <p>Corrección de tareas</p>
          <p>Formulario de contacto</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Contacto</h3>
          <p>Av. San Martín 123, Ucayali, Perú</p>
          <p>(01) 123-4567</p>
          <p>+51 986 548 794</p>
          <p>eco@plantita.pe</p>
        </div>
      </footer>
    </div>
  );
}