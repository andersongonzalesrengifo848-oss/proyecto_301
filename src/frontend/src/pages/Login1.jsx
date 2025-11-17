import React from 'react';
import {
  LogOut,
  Settings,
  HelpCircle,
  Sun,
  Edit,
  Mail,
  Calendar,
  Briefcase,
  Book,
  Heart,
  Home,
  Star,
  Trophy,
  CheckCircle,
  Activity,
  Award
} from 'lucide-react';

// --- CONFIGURACIÓN DE ESTILOS ---
const COLORS = {
  headerBg: '#388E3C', // Verde oscuro del menú superior
  headerText: '#FFFFFF',
  primary: '#7CB342', // Verde primario (botones, enlaces)
  secondary: '#B8C6A5', // Color de fondo claro / base
  background: '#F8F9F8',
  cardBg: '#FFFFFF',
  greenCompleted: '#66BB6A', // Verde Completadas
  purpleTotal: '#AB47BC',   // Morado Total Tareas
  orangeStreak: '#FF9800',  // Naranja Racha
  bluePoints: '#42A5F5',    // Azul Puntos Eco
};

// Datos simulados para la vista
const userData = {
  name: 'Anderson N. Gonzales R.',
  email: 'andersongonzalesrengifo848@gmail.com',
  memberSince: '10/05/2023',
  totalTasks: 3,
  completed: 0,
  streak: 3,
  ecoPoints: 0,
  level: 1,
  pointsToNextLevel: 100,
  categories: [
    { name: 'Trabajo', icon: Briefcase, tasks: 0, color: '#4CAF50' },
    { name: 'Personal', icon: Heart, tasks: 0, color: '#FBC02D' },
    { name: 'Estudio', icon: Book, tasks: 0, color: '#2196F3' },
    { name: 'Salud', icon: Activity, tasks: 0, color: '#E53935' },
    { name: 'Casa', icon: Home, tasks: 0, color: '#795548' },
  ],
  logros: [
    { title: 'Primera Tarea', subtitle: 'Completaste tu primera tarea ecológica', unlocked: true, date: '02/11/2023', icon: CheckCircle, color: COLORS.greenCompleted },
    { title: 'Racha de 3 días', subtitle: 'Mantuviste actividad durante 3 días consecutivos', unlocked: true, date: '05/11/2023', icon: Activity, color: COLORS.purpleTotal },
    { title: 'Eco Explorador', subtitle: 'Completaste tareas en todas las categorías', unlocked: false, icon: Award, color: COLORS.bluePoints },
    { title: 'Nivel 5', subtitle: 'Alcanzaste el nivel 5', unlocked: false, icon: Star, color: COLORS.orangeStreak },
    { title: 'Semana Perfecta', subtitle: 'Completaste todas tus tareas durante una semana', unlocked: false, icon: Award, color: COLORS.greenCompleted },
    { title: 'Mentor Ecológico', subtitle: 'Completaste 100 tareas ecológicas', unlocked: false, icon: Trophy, color: COLORS.purpleTotal },
  ],
};

// --- COMPONENTES REUTILIZABLES ---

// 1. Componente de Encabezado de Navegación
const Header = () => (
  <header className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      {/* Título de la App */}
      <h2 className="text-sm sm:text-lg font-bold tracking-tight py-1 px-4 rounded-lg" style={{ backgroundColor: COLORS.secondary, color: COLORS.headerBg }}>
        "EcoTareas: Gestión Inteligente con Impacto Verde"
      </h2>

      {/* Navegación Principal */}
      <nav className="hidden md:flex space-x-6 items-center">
        {['Inicio', 'Tareas', 'Perfil', 'Configuracion', 'Ayuda'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`text-sm font-medium hover:text-gray-900 transition duration-150 ${item === 'Perfil' ? 'font-bold underline' : 'text-gray-500'}`}
          >
            {item}
          </a>
        ))}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition duration-150"
          aria-label="Modo Día/Noche"
        >
          <Sun size={20} color={COLORS.primary} />
        </button>
        <button
          className="px-4 py-2 rounded-full text-sm font-semibold transition duration-150 shadow-md"
          style={{ backgroundColor: COLORS.primary, color: COLORS.headerText }}
        >
          <LogOut size={16} className="inline mr-1" /> Salir
        </button>
      </nav>
    </div>
  </header>
);

// 2. Componente de Métrica (Contador)
const MetricCard = ({ title, value, bgColor, icon }) => (
  <div
    className="flex flex-col items-center justify-center p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 min-w-[100px]"
    style={{ backgroundColor: bgColor, color: COLORS.headerText }}
  >
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-xs mt-1 text-center font-medium opacity-90">{title}</div>
  </div>
);

// 3. Componente de Pie de Página (Footer)
const Footer = () => (
  <footer className="mt-12 w-full pt-8 pb-4 rounded-t-3xl shadow-inner" style={{ backgroundColor: COLORS.secondary }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Col 1: AinboFlora */}
        <div>
          <h4 className="font-bold mb-3 text-lg" style={{ color: COLORS.headerBg }}>AinboFlora</h4>
          <p className="text-xs mb-3 text-gray-700">Tu plataforma ecológica para organizar, aprender y crecer. Ofrecemos herramientas educativas, recursos bilingües y gestión de tareas con impacto positivo.</p>
          <div className="flex space-x-2">
            <a href="#" className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Col 2: Enlaces Rápidos */}
        <div>
          <h4 className="font-bold mb-3" style={{ color: COLORS.headerBg }}>Enlaces Rápidos</h4>
          <ul className="space-y-2 text-gray-700">
            {['Inicio', 'Mis tareas', 'Perfil', 'Configuracion', 'Ayuda'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:underline">{link}</a></li>
            ))}
          </ul>
        </div>

        {/* Col 3: Ayuda */}
        <div>
          <h4 className="font-bold mb-3" style={{ color: COLORS.headerBg }}>Ayuda</h4>
          <ul className="space-y-2 text-gray-700">
            {['Cómo usar ecoTareas', 'Seguimiento de actividades', 'Correccion de tareas', 'Formulario de contacto', 'Términos y Condiciones'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:underline">{link}</a></li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contacto */}
        <div>
          <h4 className="font-bold mb-3" style={{ color: COLORS.headerBg }}>Contacto</h4>
          <address className="not-italic space-y-2 text-gray-700">
            <p>Av.San Martín 123, Ucayali, Perú</p>
            <p>(01) 123-4567</p>
            <p>+51 986 548 794</p>
            <p><a href="mailto:eco@plantita.pe" className="hover:underline">eco@plantita.pe</a></p>
          </address>
        </div>
      </div>
    </div>
    <div className="text-center text-xs mt-6 pt-4 border-t border-gray-300 text-gray-600">
        © 2025 EcoTareas. Todos los derechos reservados.
    </div>
  </footer>
);

// --- COMPONENTE PRINCIPAL ---
const Profile = () => {
  const activeCategory = userData.categories.find(c => c.tasks === Math.max(...userData.categories.map(cat => cat.tasks))) || userData.categories[0];
  const progressPercent = (userData.ecoPoints / userData.pointsToNextLevel) * 100;
  
  // URL de la imagen de naturaleza de la izquierda
  const TREE_IMAGE_URL = "https://placehold.co/300x200/9CCC65/ffffff?text=Arbol+en+Flor";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      <Header />
      
      {/* Contenido Principal */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Título de la Página */}
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: COLORS.headerBg }}>
            🌱 MY Perfil
          </h1>
        </div>

        {/* Métricas Globales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Total Tareas" value={userData.totalTasks} bgColor={COLORS.purpleTotal} />
          <MetricCard title="Completadas" value={userData.completed} bgColor={COLORS.greenCompleted} />
          <MetricCard title="Racha días" value={userData.streak} bgColor={COLORS.orangeStreak} />
          <MetricCard title="Puntos Eco" value={userData.ecoPoints} bgColor={COLORS.bluePoints} />
        </div>

        {/* Contenido de 3 Columnas: Info Personal | Progreso/Categorías | Logros */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Info Personal y Nivel Ecológico */}
          <div className="space-y-8">
            
            {/* Tarjeta de Información Personal */}
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: COLORS.cardBg }}>
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-lg font-semibold" style={{ color: COLORS.headerBg }}>Información Personal</h3>
                <button className="text-gray-500 hover:text-gray-700 transition"><Edit size={16} /></button>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl font-bold">{userData.name}</p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-600">Gmail</p>
                  <div className="flex items-center text-sm">
                    <Mail size={14} className="mr-1 text-gray-500" />
                    <span className="truncate">{userData.email}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-600">Miembro desde</p>
                  <div className="flex items-center text-sm">
                    <Calendar size={14} className="mr-1 text-gray-500" />
                    <span>{userData.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta de Nivel Ecológico */}
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: COLORS.greenCompleted, color: COLORS.headerText }}>
              <h3 className="text-lg font-semibold mb-4">Nivel Ecológico</h3>
              <div className="text-center">
                <p className="text-6xl font-extrabold mb-1">Nivel {userData.level}</p>
                <p className="text-xl font-medium">{userData.ecoPoints} Puntos ecológicos</p>
              </div>
              
              <div className="mt-4">
                <div className="h-2 bg-white bg-opacity-30 rounded-full">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${progressPercent}%`, backgroundColor: COLORS.headerText }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1 font-medium">
                  <span>0 Puntos</span>
                  <span>{userData.pointsToNextLevel} Puntos</span>
                </div>
                <p className="text-sm mt-2 text-center">
                  Te faltan <span className="font-bold">{userData.pointsToNextLevel - userData.ecoPoints}</span> puntos para el Nivel {userData.level + 1}
                </p>
              </div>
            </div>
            
            {/* Imagen de Naturaleza */}
            <div className="overflow-hidden rounded-xl shadow-lg">
                <img 
                    src={TREE_IMAGE_URL} 
                    alt="Árbol en flor" 
                    className="w-full h-auto object-cover" 
                />
            </div>
            
          </div> {/* Fin Columna Izquierda */}

          {/* COLUMNA DERECHA: Progreso por Categoría y Logros */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tarjeta de Progreso por Categoría */}
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: COLORS.cardBg }}>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2" style={{ color: COLORS.headerBg }}>Progreso por Categoría</h3>
              
              <div className="space-y-4">
                {userData.categories.map((cat) => (
                  <div key={cat.name} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <cat.icon size={20} style={{ color: cat.color }} />
                      <span className="font-medium" style={{ color: COLORS.textDark }}>{cat.name}</span>
                    </div>
                    <span className="font-bold text-gray-700">{cat.tasks} Tareas</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 rounded-lg text-center font-semibold" style={{ backgroundColor: COLORS.greenCompleted, color: COLORS.headerText }}>
                Categoría más activa: Con {activeCategory.tasks} Tareas completadas
              </div>
            </div>

            {/* Tarjeta de Logros Desbloqueados */}
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: COLORS.cardBg }}>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2" style={{ color: COLORS.headerBg }}>Logros Desbloqueados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userData.logros.map((logro, index) => (
                  <div key={index} 
                       className={`flex items-start p-4 rounded-xl shadow-md transition duration-300 ${logro.unlocked ? 'border-2 border-green-400' : 'border border-gray-200 opacity-60'}`} 
                       style={{ backgroundColor: COLORS.cardBg }}
                  >
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {logro.unlocked 
                        ? <logro.icon size={24} style={{ color: logro.color }} /> 
                        : <Trophy size={24} className="text-gray-400" />
                      }
                    </div>
                    <div className="flex-grow">
                      <p className={`font-bold ${logro.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>{logro.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{logro.subtitle}</p>
                      {logro.unlocked && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E8F5E9', color: COLORS.greenCompleted }}>
                          Desbloqueado: {logro.date}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div> {/* Fin Columna Derecha */}
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login1;