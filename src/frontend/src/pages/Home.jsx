import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

// Importa tu imagen del árbol de manzanas
import AppleTreeImage from '../assets/apple-tree.png'; 
// Importa tu imagen de fondo de naturaleza
import NatureBackgroundImage from '../assets/nature-bg.png';

function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    
    console.log("Intentando iniciar sesión con:", { email, password });
    
    if (email && password) {
        localStorage.setItem("authToken", "simulated_token_123");
        alert("¡Inicio de sesión simulado exitoso!");
        navigate("/"); 
    } else {
        alert("Por favor, ingresa tu email y contraseña.");
    }
  };

  return (
    // Contenedor principal con la imagen de fondo de naturaleza
    // bg-cover: Cubre todo el espacio.
    // bg-center: Centra la imagen.
    // bg-fixed: Fija la imagen para que no se mueva al hacer scroll (opcional).
    // bg-opacity-70: Añade una capa oscura/clara sobre el fondo para mejorar la legibilidad del texto del formulario (opcional).
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ 
        backgroundImage: `url(${NatureBackgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Opcional: la imagen de fondo no se desplaza con el contenido
      }}
    >
      {/* Contenedor para aplicar un overlay semitransparente (oscuro o claro) para que el formulario se vea mejor */}
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay oscuro */}
      {/* Si prefieres un overlay claro: <div className="absolute inset-0 bg-white opacity-20"></div> */}

      {/* El formulario de login, elevado por encima del overlay */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl text-center shadow-lg relative z-10"> {/* z-10 para que esté encima del overlay */}
        
        {/* Imagen del árbol */}
        <div className="flex justify-center mb-6">
          <img 
            src={AppleTreeImage}
            alt="Árbol de Manzanas" 
            className="w-24 h-24 object-contain" 
          />
        </div>
        
        {/* Título y Subtítulo */}
        <h2 className="text-3xl font-normal text-gray-800 mb-2">Login</h2>
        <p className="text-gray-500 mb-8">
          Iniciar sesión para acceder a tu cuenta de EcoTareas
        </p>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Campo Email */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Campo Contraseña REVISADO para centrar el ojo */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Contraseña</label>
            
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 pr-10" 
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 pr-3 text-gray-500 hover:text-gray-800 top-1/2 transform -translate-y-1/2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                   {showPassword ? (
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /> 
                   ) : (
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.3 18.3 0 0 1 5-4.5M15 12a3 3 0 1 1-3-3M2 2l20 20" /> 
                   )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Opciones Adicionales */}
          <div className="flex justify-between items-center text-sm mt-2">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2 text-green-600 rounded" />
              Recordarme
            </label>
            <Link to="/forgot-password" className="text-red-500 hover:text-red-700">
              Forgot Password
            </Link>
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            className="w-full py-2 mt-6 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition duration-150"
          >
            Login
          </button>
        </form>

        {/* Enlace de Registro */}
        <p className="mt-6 text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-red-500 font-medium hover:text-red-700">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginView;
