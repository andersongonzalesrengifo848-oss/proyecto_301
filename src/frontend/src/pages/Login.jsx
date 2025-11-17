import { useState } from "react";

// --- Mocking React Router for single-file component requirement ---
// In a real project, you would import these from 'react-router-dom'.
const useNavigate = () => (path) => {
  console.log('Navigating to:', path);
  // Optional: Set a state to simulate navigation if needed for a multi-page app.
};
const Link = ({ to, children, className }) => (
  <a 
    href="#" 
    onClick={(e) => { e.preventDefault(); console.log('Link to:', to); }} 
    className={className}
  >
    {children}
  </a>
);
// --- End Mocking ---

// Mocking environment variables as they are not available in this runtime
const GOOGLE_AUTH_URL = "http://localhost:3000/api/auth/google";

// SVG Icons (Lucide-React style for the eye icon)
const EyeIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.88 9.88a3 3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.13 13.13 0 0 0 2 12s3 7 10 7c.76 0 1.5-0.1 2.22-0.28" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const EcoTareasLogo = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#4d7c0f" // Dark green stroke
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="w-16 h-16 mx-auto mb-4"
    >
        {/* A simple stylized leaf/flower icon */}
        <path d="M12 21.5L12 12" />
        <path d="M12 12c-3.3 0-6-2.7-6-6S8.7 0 12 0s6 2.7 6 6" strokeWidth="2" fill="none" transform="rotate(45 12 12)"/>
        <path d="M12 12c-3.3 0-6-2.7-6-6S8.7 0 12 0s6 2.7 6 6" strokeWidth="2" fill="none" transform="rotate(-45 12 12)"/>
        <circle cx="12" cy="12" r="2" fill="#4d7c0f" stroke="none" />
    </svg>
);


function Login() {
  const [email, setEmail] = useState("Nika.ka@gmail.com"); // Pre-filled for demo
  const [password, setPassword] = useState("••••••••••••"); // Pre-filled for demo
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      // NOTE: The original code used a hardcoded API URL and `localStorage`.
      // The `fetch` call is kept for structure, but be aware that for a real-world
      // application, you should use the provided Firebase utilities for authentication
      // and state persistence, as required by the environment's security model.
      
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify ({ email, password }),
      });

      const data = await response.json();
      if(!response.ok){
        throw new Error (data.message || "Error al iniciar sesión");
      }

      // localStorage.setItem("authToken", data.data.token); // REMOVED: Use Firestore/Auth for persistence
      navigate("/login-success");

    } catch (err) {
      setError(err.message);
      // Show an error message box instead of an alert
      console.error("Login Error:", err.message);
    }
  };
  
  return (
    // Background color: Light off-white/beige from the image
    <div className="flex items-center justify-center min-h-screen bg-stone-100 p-4 font-sans">
      
      {/* Login Card: White, max-width, rounded corners, subtle shadow */}
      <div className="w-full max-w-sm md:max-w-md p-10 bg-white rounded-3xl shadow-lg border border-gray-200">
        
        <EcoTareasLogo />

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-1">
          Login
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Iniciar sesión para acceder a tu cuenta de EcoTareas
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 transition duration-150"
            />
          </div>

          {/* Password Input with Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 transition duration-150"
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Checkbox and Forgot Password Link */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Recordarme
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-pink-600 hover:text-pink-800 transition duration-150"
            >
              Forgot Password
            </Link>
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          {/* Login Button: Dark Green */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white font-medium bg-green-700 border border-transparent rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition duration-150"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-pink-600 hover:text-pink-800 transition duration-150"
          >
            Regístrate
          </Link>
        </p>

      </div>
    </div>
  );
}

// Main App component to render the single file
const App = () => {
    return (
        <Login />
    );
};

export default App;
