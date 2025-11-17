import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

// Importa tu imagen del árbol (logo) y la imagen lateral
// Asegúrate de que las rutas y nombres coincidan con los de tu carpeta 'assets'
import AppleTreeImage from '../assets/apple-tree.png'; 
import LilyOfTheValleyImage from '../assets/nature-bg.png'; 

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); 
    
    // Validaciones básicas
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    if (!termsAccepted) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // --- Lógica de Registro REAL aquí (llamada a API) ---
    console.log("Intentando registrar con:", { firstName, lastName, email });
    
    // Simulación de registro exitoso:
    alert("¡Registro simulado exitoso! Ahora puedes iniciar sesión.");
    navigate("/login"); // Redirige a la página de login después del registro
  };

  // Componente auxiliar para el campo de contraseña con ojo centrado
  const PasswordField = ({ id, value, onChange, label, showState, setShowState }) => (
    <div className="text-left">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showState ? "text" : "password"}
          placeholder="••••••••••••"
          value={value}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowState(!showState)}
          // Centrado robusto para el icono del ojo
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
             {showState ? (
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /> // Ojo Abierto
             ) : (
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.3 18.3 0 0 1 5-4.5M15 12a3 3 0 1 1-3-3M2 2l20 20" /> // Ojo Cerrado
             )}
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    // Contenedor principal con fondo beige claro (gray-50) y centrado
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      
      {/* Contenedor del Formulario y la Imagen Lateral */}
      <div className="w-full max-w-4xl flex bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Lado Izquierdo: Formulario de Registro */}
        <div className="w-full lg:w-1/2 p-10">
          
          {/* Logo del Árbol */}
          <div className="flex justify-center mb-4">
            <img 
              src={AppleTreeImage}
              alt="Árbol de Manzanas" 
              className="w-16 h-16 object-contain" 
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Create an Account
          </h2>
          <p className="text-gray-500 mb-6 text-center text-sm">
            Please fill in the form to continue.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Fila 1: Nombre y Apellido (Doble Columna) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            {/* Fila 2: Email (Columna Única) */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            {/* Fila 3: Contraseñas (Doble Columna con Ojo) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PasswordField 
                id="password" 
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showState={showPassword}
                setShowState={setShowPassword}
              />
              <PasswordField 
                id="confirmPassword" 
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                showState={showConfirmPassword}
                setShowState={setShowConfirmPassword}
              />
            </div>

            {/* Fila 4: Términos y Condiciones */}
            <div className="flex items-center mt-4">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                className="text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the 
                <Link to="/terms" className="text-red-500 hover:text-red-700 ml-1">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Botón de Registro */}
            <button
              type="submit"
              className="w-full py-2 mt-6 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-150"
            >
              Register
            </button>
          </form>

          {/* Enlace de Login */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 font-medium hover:text-red-700">
              Login
            </Link>
          </p>
        </div>

        {/* Lado Derecho: Imagen Lateral (Solo visible en pantallas grandes) */}
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center"
             style={{ 
               backgroundImage: `url(${LilyOfTheValleyImage})`,
             }}>
        </div>
      </div>
    </div>
  );
}

export default Register;