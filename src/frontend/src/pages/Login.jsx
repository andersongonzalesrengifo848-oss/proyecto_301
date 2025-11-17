import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

// URL de la imagen de fondo (Lirio del valle)
// Usamos una URL de placeholder porque no podemos acceder a archivos locales
const LILY_IMAGE_URL = "https://placehold.co/300x550/B8C6A5/388E3C?text=Lirios+del+Valle";

// Constantes de estilo basadas en tu diseño
const COLORS = {
  background: '#F8F9F8', // Fondo general
  cardBg: '#FFFFFF',     // Fondo de la tarjeta
  primary: '#388E3C',    // Verde primario (botones, textos clave)
  secondary: '#7CB342',  // Verde secundario/acento
  textDark: '#333333',
  textLight: '#ffffff',
  error: '#E53935',
  border: '#D1D5DB',     // Borde de input
};

// Componente principal de Registro
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Nikasio',
    email: 'anderson.lu@gmail.com',
    phone: '907323729',
    password: 'password123',
    confirmPassword: 'password123',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Manejador genérico para la entrada del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Simulación de la función de registro
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validación básica
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios.');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
        setError('Debes aceptar los Términos y Políticas de Privacidad.');
        setIsLoading(false);
        return;
    }

    // Aquí iría la lógica real de Firebase (auth.createUserWithEmailAndPassword)
    console.log("Simulando registro de usuario:", formData);

    // Simular un retraso de la API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Si el registro es exitoso, redirigir al login o al home
    setIsLoading(false);
    navigate('/login'); // Redirigir al Login para iniciar sesión
  };
  
  // Icono para mostrar/ocultar la contraseña
  const PasswordIcon = showPassword ? EyeOff : Eye;

  // Renderizado del input de texto con etiqueta
  const InputField = ({ label, name, type = 'text', value, placeholder, isPassword = false }) => (
    <div className='flex-1'>
      <label htmlFor={name} className="block text-xs font-medium" style={{ color: COLORS.textDark }}>
        {label}
      </label>
      <div className='relative'>
        <input
          id={name}
          name={name}
          type={isPassword && !showPassword ? 'password' : type}
          value={value}
          onChange={handleChange}
          required
          className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2"
          style={{ borderColor: COLORS.border, outlineColor: COLORS.secondary, color: COLORS.textDark }}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <PasswordIcon size={18} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8" style={{ backgroundColor: COLORS.background }}>
      <div 
        className="flex w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 ease-in-out" 
        style={{ backgroundColor: COLORS.cardBg }}
      >
        {/* Columna Izquierda (Imagen de Naturaleza) */}
        <div 
          className="hidden md:block md:w-1/3 bg-cover bg-center h-auto p-6"
          style={{ backgroundImage: `url(${LILY_IMAGE_URL})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        >
          {/* Contenido opcional sobre la imagen */}
          <div className="bg-white bg-opacity-30 backdrop-blur-sm p-3 rounded-xl">
             <span className="text-xl font-bold text-white tracking-widest">EcoTareas</span>
          </div>
        </div>

        {/* Columna Derecha (Formulario de Registro) */}
        <div className="w-full md:w-2/3 p-6 sm:p-10 lg:p-16">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-4xl font-semibold" style={{ color: COLORS.textDark }}>
              Registrarse
            </h1>
            <p className="mt-2 text-md" style={{ color: '#6B7280' }}>
              Vamos a configurarte para que puedas acceder a tu cuenta personal
            </p>
          </div>

          {error && (
            <div className="p-3 mb-4 rounded-lg font-medium text-sm text-center" style={{ backgroundColor: '#FEE2E2', color: COLORS.error }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Fila 1: Nombre y Apellido (o simplemente Nombre) */}
            <div className="flex flex-col sm:flex-row gap-6">
              <InputField label="Nombre" name="name" value={formData.name} placeholder="Nikasio" />
              <InputField label="Apellido" name="lastName" value={"López"} placeholder="López" /> 
            </div>

            {/* Fila 2: Email y Teléfono */}
            <div className="flex flex-col sm:flex-row gap-6">
              <InputField label="Email" name="email" type="email" value={formData.email} placeholder="anderson.lu@gmail.com" />
              <InputField label="Teléfono" name="phone" type="tel" value={formData.phone} placeholder="907323729" />
            </div>

            {/* Fila 3: Contraseña */}
            <InputField 
                label="Contraseña" 
                name="password" 
                value={formData.password} 
                isPassword={true} 
            />

            {/* Fila 4: Confirmar Contraseña */}
            <InputField 
                label="Confirmar contraseña" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                isPassword={true} 
            />

            {/* Checkbox de Términos */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                    <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 rounded"
                        style={{ color: COLORS.primary, accentColor: COLORS.primary }}
                    />
                    <label htmlFor="acceptTerms" className="ml-2 block text-sm" style={{ color: COLORS.textDark }}>
                        acepto todos los 
                        <span className="font-semibold cursor-pointer ml-1" style={{ color: COLORS.error }}>
                            Términos y Políticas de Privacidad
                        </span>
                    </label>
                </div>
            </div>

            {/* Botón de Crear Cuenta */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium transition duration-300 ease-in-out hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: COLORS.primary, color: COLORS.textLight }}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          {/* Enlace para Iniciar Sesión */}
          <div className="text-center mt-6 text-sm">
            <p style={{ color: COLORS.textDark }}>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-semibold hover:underline" style={{ color: COLORS.secondary }}>
                Iniciar sección
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
