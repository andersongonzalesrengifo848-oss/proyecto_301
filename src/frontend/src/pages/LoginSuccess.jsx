import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const CheckIcon = () => (
  <svg
    className="w-16 h-16 mx-auto text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const ErrorIcon = () => (
  <svg
    className="w-16 h-16 mx-auto text-red-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export default function LoginSuccess() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let receivedToken = null;
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      receivedToken = tokenFromUrl;
      localStorage.setItem("authToken", receivedToken);
    } else {
      const tokenFromStorage = localStorage.getItem("authToken");
      if (tokenFromStorage) {
        receivedToken = tokenFromStorage;
      }
    }

    if (receivedToken) {
      setToken(receivedToken);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <ClipLoader color={"#16a34a"} loading={loading} size={60} />
        <p className="mt-4 text-lg text-gray-600">Verificando autenticación...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* NAVBAR */}
      <nav className="w-full bg-green-300 shadow flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-bold text-green-900">
          EcoTareas: Gestión Inteligente con Impacto Verde
        </h1>
        <ul className="flex gap-6 text-green-900 font-semibold">
          <li>Inicio</li>
          <li>Tareas</li>
          <li>Perfil</li>
          <li>Configuración</li>
          <li>Ayuda</li>
        </ul>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
          Salir
        </button>
      </nav>

      {/* SUCCESS CARD */}
      <div className="flex items-center justify-center flex-grow px-4">
        <div className="w-full max-w-md p-8 space-y-4 text-center bg-white rounded-2xl shadow-lg border border-green-100">
          {token ? (
            <>
              <CheckIcon />
              <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido!</h1>
              <p className="text-gray-600">Tu inicio de sesión ha sido exitoso.</p>
              <p className="pt-4 text-sm text-gray-500">
                Serás redirigido a la página principal en unos instantes...
              </p>
            </>
          ) : (
            <>
              <ErrorIcon />
              <h1 className="text-3xl font-bold text-gray-800">Algo salió mal</h1>
              <p className="text-gray-600">
                No pudimos verificar tu identidad. Por favor,{' '}
                <a href="/login" className="font-medium text-green-600 hover:underline">
                  inténtalo de nuevo
                </a>.
              </p>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-green-200 p-6 text-gray-800 text-sm grid grid-cols-3 gap-4">
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
};