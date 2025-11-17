import React, { useState } from 'react';
import {
  LogOut,
  Settings,
  HelpCircle,
  Sun,
  Send,
  Calendar,
  Briefcase,
  Book,
  Heart,
  Home,
  Check,
  Zap,
  Leaf,
  RefreshCcw,
  List,
  ChevronDown
} from 'lucide-react';

// --- CONFIGURACIÓN DE ESTILOS ---
const COLORS = {
  headerBg: '#388E3C', // Verde oscuro del menú superior/título
  headerText: '#FFFFFF',
  primary: '#66BB6A', // Verde primario (botones, consejos)
  secondary: '#B8C6A5', // Color de fondo claro / base
  background: '#F8F9F8',
  cardBg: '#FFFFFF',
  purpleTotal: '#AB47BC',   // Morado Total Tareas
  greenCompleted: '#66BB6A', // Verde Completadas
  bluePending: '#42A5F5',    // Azul Pendientes
  orangeToday: '#FF9800',  // Naranja Hoy
  consejosBg: '#C8E6C9', // Fondo claro de consejos
  consejosHeader: '#81C784', // Fondo de la cabecera de consejos
  textDark: '#333333',
};

// Datos simulados (Métricas y Consejos)
const initialMetrics = {
  total: 0,
  completed: 0,
  pending: 0,
  today: 3,
};

const ecoTip = {
  category: 'Alimentacion',
  points: 30,
  tip: 'Cultiva tus propias Hierbas: Cultivar albahaca, perejil o menta en casa reduce el empaque y transporte de alimentos. ¡Y siempre están frescas!',
  fact: 'Pequeñas acciones diarias pueden generar grandes cambios para nuestro planeta',
};

// --- COMPONENTES REUTILIZABLES ---

// 1. Componente de Encabezado de Navegación
const Header = () => (
  <header className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      {/* Título de la App */}
      <h2 className="text-sm sm:text-lg font-bold tracking-tight py-1 px-4 rounded-lg" style={{ backgroundColor: COLORS.secondary, color: COLORS.headerBg }}>
        “EcoTareas: Gestión Inteligente con Impacto Verde”
      </h2>

      {/* Navegación Principal */}
      <nav className="hidden md:flex space-x-6 items-center">
        {['Inicio', 'Tareas', 'Perfil', 'Configuracion', 'Ayuda'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`text-sm font-medium hover:text-gray-900 transition duration-150 ${item === 'Tareas' ? 'font-bold underline' : 'text-gray-500'}`}
          >
            {item}
          </a>
        ))}
        <button
          className="p-2 rounded-full transition duration-150"
          style={{ backgroundColor: COLORS.consejosHeader }}
          aria-label="Modo Día/Noche"
        >
          <Sun size={20} color={COLORS.headerText} />
        </button>
        <button
          className="px-4 py-2 rounded-full text-sm font-semibold transition duration-150 shadow-md"
          style={{ backgroundColor: COLORS.headerBg, color: COLORS.headerText }}
        >
          <LogOut size={16} className="inline mr-1" /> Salir
        </button>
      </nav>
    </div>
  </header>
);

// 2. Componente de Métrica (Contador)
const MetricCard = ({ title, value, bgColor }) => (
  <div
    className="flex flex-col items-center justify-center p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 min-w-[100px]"
    style={{ backgroundColor: bgColor, color: COLORS.headerText }}
  >
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-xs mt-1 text-center font-medium opacity-90">{title}</div>
  </div>
);

// 3. Componente de Pie de Página (Footer - simplificado)
const Footer = () => (
  <footer className="mt-12 w-full pt-8 pb-4 rounded-t-3xl shadow-inner" style={{ backgroundColor: COLORS.consejosHeader }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-800">
        {/* Col 1: AinboFlora */}
        <div>
          <h4 className="font-bold mb-3 text-lg" style={{ color: COLORS.headerBg }}>AinboFlora</h4>
          <p className="text-xs mb-3">Tu plataforma ecológica para organizar, aprender y crecer. Ofrecemos herramientas educativas, recursos bilingües y gestión de tareas con impacto positivo.</p>
        </div>

        {/* Col 2: Enlaces Rápidos */}
        <div>
          <h4 className="font-bold mb-3" style={{ color: COLORS.headerBg }}>Enlaces Rápidos</h4>
          <ul className="space-y-2">
            {['Inicio', 'Mis tareas', 'Perfil', 'Configuracion', 'Ayuda'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:underline">{link}</a></li>
            ))}
          </ul>
        </div>

        {/* Col 3: Ayuda */}
        <div>
          <h4 className="font-bold mb-3" style={{ color: COLORS.headerBg }}>Ayuda</h4>
          <ul className="space-y-2">
            {['Cómo usar ecoTareas', 'Seguimiento de actividades', 'Correccion de tareas', 'Formulario de contacto', 'Términos y Condiciones'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:underline">{link}</a></li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contacto */}
        <div>
          <h4 className="font-bold mb-3" style={{ color: COLORS.headerBg }}>Contacto</h4>
          <address className="not-italic space-y-2">
            <p>Av.San Martín 123, Ucayali, Perú</p>
            <p>(01) 123-4567</p>
            <p>+51 986 548 794</p>
            <p><a href="mailto:eco@plantita.pe" className="hover:underline">eco@plantita.pe</a></p>
          </address>
        </div>
      </div>
    </div>
  </footer>
);

// --- COMPONENTE PRINCIPAL ---
const Tasks = () => {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [taskData, setTaskData] = useState({
    tarea: '',
    categoria: 'Personal',
    descripcion: '',
    fecha: '01/10/2011',
  });
  const [selectedFilter, setSelectedFilter] = useState('Todas las tareas');

  const categories = [
    { name: 'Personal', icon: Heart, color: '#FBC02D' },
    { name: 'Trabajo', icon: Briefcase, color: '#4CAF50' },
    { name: 'Estudio', icon: Book, color: '#2196F3' },
    { name: 'Salud', icon: Zap, color: '#E53935' },
    { name: 'Casa', icon: Home, color: '#795548' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = () => {
    // Lógica para crear tarea (aquí solo simulamos un incremento)
    console.log('Creando tarea:', taskData);
    setMetrics(prev => ({ ...prev, total: prev.total + 1, pending: prev.pending + 1 }));
    setTaskData({ tarea: '', categoria: 'Personal', descripcion: '', fecha: '01/10/2011' }); // Resetear
    // Aquí iría la lógica de guardado en Firestore
  };

  const handleCancel = () => {
    setTaskData({ tarea: '', categoria: 'Personal', descripcion: '', fecha: '01/10/2011' });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      <Header />
      
      {/* Contenido Principal */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Título de la Página */}
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: COLORS.headerBg }}>
            🌱 MIS TAREAS
          </h1>
        </div>

        {/* Layout de 3 Columnas: Consejos | Formulario | Tareas (simulado) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Consejos Ecológicos y Filtros */}
          <div className="space-y-8">
            
            {/* Tarjeta de Consejos Ecológicos */}
            <div className="p-4 rounded-xl shadow-lg" style={{ backgroundColor: COLORS.consejosBg }}>
              <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: COLORS.consejosHeader }}>
                <h3 className="text-sm font-semibold" style={{ color: COLORS.headerText }}>Consejos ecologicos</h3>
                <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium" style={{ color: COLORS.headerText }}>{ecoTip.category}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: COLORS.headerText, color: COLORS.consejosHeader }}>+{ecoTip.points} pts</span>
                </div>
              </div>
              
              <div className="mt-3 text-sm text-gray-800">
                <p className="font-semibold mb-2">{ecoTip.tip.split(':')[0]}:</p>
                <p className="text-xs">{ecoTip.tip.split(':')[1]?.trim()}</p>
                
                <button 
                  className="w-full mt-4 py-2 rounded-full font-semibold flex items-center justify-center transition duration-300"
                  style={{ backgroundColor: COLORS.primary, color: COLORS.headerText }}
                >
                  <RefreshCcw size={16} className="mr-2" /> Otro consejo
                </button>

                <div className="mt-4 p-3 rounded-lg text-center" style={{ backgroundColor: COLORS.headerText, border: '1px solid #A5D6A7' }}>
                    <p className="font-semibold" style={{ color: COLORS.headerBg }}>¿Sabías que?</p>
                    <p className="text-xs text-gray-700">{ecoTip.fact}</p>
                </div>
              </div>
            </div>

            {/* Tarjeta de Filtros Rápidos */}
            <div className="p-4 rounded-xl shadow-lg" style={{ backgroundColor: COLORS.cardBg }}>
              <h3 className="text-sm font-semibold mb-3 border-b pb-2" style={{ color: COLORS.headerBg }}>Filtros rapidos</h3>
              
              <div className="space-y-1">
                {['Todas las tareas', ...categories.map(c => c.name)].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition duration-150 flex justify-between items-center ${
                      selectedFilter === filter
                        ? 'bg-gray-200 font-bold'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {filter}
                    {filter === 'Personal' && <Send size={14} className="text-green-500" />}
                  </button>
                ))}
              </div>
            </div>
            
          </div> {/* Fin Columna Izquierda */}

          {/* COLUMNA CENTRAL/DERECHA (Expandida): Métricas, Formulario y Lista de Tareas */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Métricas Globales */}
            <div className="grid grid-cols-4 gap-4">
                <MetricCard title="Total" value={metrics.total} bgColor={COLORS.purpleTotal} />
                <MetricCard title="Completadas" value={metrics.completed} bgColor={COLORS.greenCompleted} />
                <MetricCard title="Pendientes" value={metrics.pending} bgColor={COLORS.bluePending} />
                <MetricCard title="Hoy" value={metrics.today} bgColor={COLORS.orangeToday} />
            </div>

            {/* Formulario Nueva Tarea */}
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: COLORS.cardBg }}>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2" style={{ color: COLORS.headerBg }}>Nueva tarea</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Tarea / Descripción */}
                <div className="sm:col-span-1">
                  <label htmlFor="tarea" className="block text-sm font-medium text-gray-700">Tarea</label>
                  <input
                    type="text"
                    id="tarea"
                    name="tarea"
                    placeholder="Descripción"
                    value={taskData.tarea}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Categoría */}
                <div className="sm:col-span-1">
                  <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={taskData.categoria}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descripción Opcional */}
              <div className="mt-4">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripcion(Opcional)</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Detalles adicionales.."
                  value={taskData.descripcion}
                  onChange={handleInputChange}
                  rows="2"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>

              {/* Fecha */}
              <div className="mt-4 max-w-xs">
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="text"
                  id="fecha"
                  name="fecha"
                  value={taskData.fecha}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Botones */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium rounded-full text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateTask}
                  className="px-4 py-2 text-sm font-medium rounded-full transition duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: COLORS.primary, color: COLORS.headerText }}
                >
                  Crear tarea
                </button>
              </div>
            </div>

            {/* Lista de Tareas (Mensaje de No Tareas) */}
            <div className="p-8 mt-8 flex flex-col items-center justify-center rounded-xl shadow-lg h-64" style={{ backgroundColor: COLORS.cardBg }}>
                <List size={48} className="text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No tienes tareas aun</h3>
                <p className="text-gray-500 mb-4 text-center">Crea tu primera tarea para comenzar tu viaje ecológico</p>
                <button
                    onClick={() => { /* Lógica para abrir/enfocar el formulario */ }}
                    className="px-6 py-3 text-base font-semibold rounded-full transition duration-300 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.headerText }}
                >
                    Crear Tarea
                </button>
            </div>
            
          </div> {/* Fin Columna Central/Derecha */}
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginSuccess;