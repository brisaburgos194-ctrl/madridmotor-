/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, ShieldCheck, TrendingDown, Clock, AlertTriangle, FileText, 
  CheckCircle2, ArrowRight, Phone, Mail, Building2, ChevronRight, 
  Award, DollarSign, Users, BarChart3, HelpCircle, Briefcase, 
  Settings, ClipboardList, Check, Star, Play, ThumbsUp, Activity,
  PhoneCall, Sparkles, MessageSquare, AlertCircle, UserCheck, MessageCircle
} from 'lucide-react';
import LeadForm from './components/LeadForm';
import LeadDashboard from './components/LeadDashboard';
import FAQ from './components/FAQ';
import { TestimonialItem, BonusItem } from './types';

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Llevábamos dos años con un problema hidráulico intermitente en una de nuestras excavadoras que tres talleres diferentes no habían podido resolver de forma definitiva. El equipo de Madrid Motor hizo el diagnóstico correcto en la primera visita, nos explicó exactamente qué estaba pasando y por qué los parches anteriores no funcionaban. Desde esa intervención, el equipo lleva 11 meses operando sin incidentes. No sé qué nos costó más: lo que pagamos a Madrid Motor o todo lo que gastamos antes sin resultado.',
    author: 'Jofre Sánchez',
    role: 'Gerente de Operaciones, empresa de movimiento de tierras',
    fleetSize: '23 equipos en flota'
  },
  {
    id: 't2',
    quote: 'Lo que más valoro de trabajar con Madrid Motor no es solo la calidad técnica, que es indiscutible, sino el orden. Cada servicio tiene su informe, cada recomendación queda documentada, y cuando mi dirección me pide justificar el presupuesto de mantenimiento, tengo papeles que respaldan cada peso gastado. Antes era una caja negra. Ahora es un proceso gestionado.',
    author: 'Patricia V.',
    role: 'Jefa de Mantenimiento, empresa constructora',
    fleetSize: 'Región andina'
  },
  {
    id: 't3',
    quote: 'Firmamos un contrato de mantenimiento programado para nuestra flota de 8 motoconformadoras y el cambio ha sido notable. En el primer año, redujimos las paradas no programadas en más de un 70%. El costo total de mantenimiento bajó respecto al año anterior, incluso con el contrato. Y lo que no se mide fácilmente pero se siente: ya no vivo con el teléfono en la mano esperando que me llamen con una mala noticia.',
    author: 'Nelson Delgado',
    role: 'Propietario, empresa de obras viales',
    fleetSize: '8 motoconformadoras'
  },
  {
    id: 't4',
    quote: 'Soy escéptico por naturaleza y cuando me contactaron no esperaba nada diferente a lo que había visto antes. Me equivoqué. La diferencia está en el diagnóstico: usan equipos que la mayoría de los talleres no tienen, y eso se traduce en intervenciones precisas. No andan "tanteando" a ver qué resulta. Saben lo que hacen y lo demuestran.',
    author: 'Andrés T.',
    role: 'Gerente Técnico, empresa minera de mediana escala',
    fleetSize: 'Flota mixta'
  },
  {
    id: 't5',
    quote: 'El bono de asesoría técnica fue lo que más nos sorprendió. Nos dieron orientación concreta a nuestros operadores sobre hábitos de uso que estaban acelerando el desgaste de los equipos. Cambios simples que nunca nadie nos había explicado. Desde entonces, los mismos operadores cuidan más las máquinas porque entienden por qué importa.',
    author: 'Mónica R.',
    role: 'Directora Administrativa, empresa de alquiler de maquinaria pesada',
    fleetSize: 'Flota de alquiler'
  }
];

const BONUSES: BonusItem[] = [
  {
    id: 'b1',
    title: 'Asesoría Técnica Personalizada para el Cuidado y Uso de su Maquinaria',
    value: 'USD 300',
    description: 'Nuestro equipo técnico revisa las condiciones de operación de su flota y le entrega orientación específica y accionable: qué ajustar en los protocolos de uso, qué señales deben reportar los operadores y qué prácticas están acortando la vida de los equipos. Una sola recomendación bien aplicada puede ahorrarle miles de dólares.',
    badge: 'INCLUIDO GRATIS'
  },
  {
    id: 'b2',
    title: 'Descuentos Especiales para Clientes Frecuentes y Contratos',
    value: 'Prioridad de Agenda',
    description: 'Establezca una relación de mantenimiento continuo con Madrid Motor y acceda a condiciones preferenciales en todos los servicios. Esto incluye tarifas reducidas en mano de obra, prioridad absoluta de programación en reparaciones de emergencia y cotizaciones preferenciales en repuestos originales.',
    badge: 'ACCESO EXCLUSIVO'
  }
];

export default function App() {
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [activeBeforeAfter, setActiveBeforeAfter] = useState<'antes' | 'despues'>('antes');
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  const handleLeadSuccess = () => {
    // Force dashboard component update
    setLastUpdated(Date.now());
  };

  const scrollToForm = () => {
    const element = document.getElementById('quote-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Lead Monitoring Dashboard (for demonstration and local control) */}
      <LeadDashboard lastUpdated={lastUpdated} onClear={() => setLastUpdated(Date.now())} />

      {/* Floating Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-850 shadow-lg shadow-indigo-550/10 bg-slate-900 flex items-center justify-center shrink-0">
              <img 
                src="/src/assets/images/madrid_motor_logo_1783780227291.jpg" 
                alt="Madrid Motor" 
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white">MADRID<span className="text-indigo-400"> MOTOR</span></span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">Mantenimiento de Maquinarias Pesadas</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <a href="#el-problema" className="hover:text-indigo-400 transition-colors">El Problema</a>
            <a href="#la-solucion" className="hover:text-indigo-400 transition-colors">La Solución</a>
            <a href="#beneficios" className="hover:text-indigo-400 transition-colors">Beneficios</a>
            <a href="#como-funciona" className="hover:text-indigo-400 transition-colors">Cómo Funciona</a>
            <a href="#testimonios" className="hover:text-indigo-400 transition-colors">Testimonios</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">Preguntas Frecuentes</a>
          </nav>

          <button 
            onClick={scrollToForm}
            className="bg-indigo-500 hover:bg-indigo-400 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 cursor-pointer"
          >
            Cotizar Flota
          </button>
        </div>
      </header>

      {/* SECTION 1: Above The Fold (Dark Background - Cosmic Slate/Zinc) */}
      <section className="relative pt-12 pb-20 md:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-900 overflow-hidden">
        {/* Abstract background grid or circles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-450 uppercase tracking-widest animate-pulse">
                <ShieldCheck className="w-3.5 h-3.5" />
                Mantenimiento de Precisión
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] font-sans">
                Cada Hora que su <span className="text-indigo-400 underline decoration-indigo-500/40 decoration-wavy">Maquinaria Pesada Está Parada</span>, su Empresa Pierde Dinero que Nunca Recuperará
              </h1>

              <p className="text-sm sm:text-base text-slate-400 italic font-medium max-w-2xl border-l-2 border-indigo-500 pl-4 py-1">
                ¿Cuánto le está costando realmente ignorar el mantenimiento preventivo?
              </p>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                Descubra cómo los gerentes y jefes de mantenimiento más inteligentes del sector están eliminando fallas imprevistas, reduciendo hasta un 60% sus costos operativos y manteniendo su flota al 100% de capacidad — con un sistema de mantenimiento profesional que trabaja para usted, no contra usted.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={scrollToForm}
                  className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/30 flex items-center justify-center gap-3 text-sm md:text-base cursor-pointer"
                >
                  <span>Solicitar Diagnóstico Comercial</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
                
                <a 
                  href="#el-problema" 
                  className="px-6 py-4 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 text-slate-300 hover:text-white font-bold transition-all text-center text-sm md:text-base"
                >
                  Conocer el sistema
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-900 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">Hasta 60%</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Ahorro Operativo</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">0%</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Fallas Sorpresa</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Garantizado</div>
                </div>
              </div>
            </div>

            {/* Right Media (Main Hero Image - generated) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-2xl filter blur-xl opacity-40 animate-pulse" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                <img 
                  src="/src/assets/images/heavy_machinery_hero_1783176608741.jpg" 
                  alt="Modern Heavy Machinery Workshop with Excavator and Technicians" 
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Live Float Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <div className="w-3 h-3 absolute rounded-full bg-emerald-500" />
                    <div>
                      <span className="text-white font-extrabold text-xs block">Diagnósticos Electrónicos</span>
                      <span className="text-[9px] text-slate-400 font-medium">Asignados en tiempo real</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                    Soporte 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Introducción — El Problema (Light Background - Soft Off-White/Grey) */}
      <section id="el-problema" className="py-20 md:py-28 bg-slate-50 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Escenario Crítico</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-2 leading-tight">
              Usted lo sabe mejor que nadie.
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed font-medium">
            <p className="font-semibold text-slate-950 text-base sm:text-lg md:text-xl border-l-4 border-indigo-500 pl-4">
              Son las 6:15 de la mañana. El turno arranca en 45 minutos. Y entonces suena el teléfono.
            </p>
            
            <p className="italic bg-slate-100 border border-slate-200/80 rounded-xl p-4 font-bold text-slate-900 text-center text-lg shadow-sm">
              "Jefe, el equipo no enciende."
            </p>

            <p>
              En ese momento, no solo se detiene una máquina. Se detiene toda una cadena: operarios parados cobrando hora, clientes esperando, contratos en riesgo, presupuestos destruidos. Y usted, tratando de conseguir un técnico de emergencia que cobra el doble porque es urgente, buscando repuestos que no tiene en stock, explicándole a la gerencia por qué el proyecto se retrasa otra vez.
            </p>

            <p>
              Este escenario no es raro. Es el pan de cada día en cientos de empresas del sector.
            </p>

            <p className="font-bold text-slate-950 text-base sm:text-lg">
              Y lo más frustrante de todo es que, en la mayoría de los casos, <span className="underline decoration-indigo-500 decoration-4">esa falla era completamente evitable.</span>
            </p>

            <p>
              La realidad es brutal: la maquinaria pesada mal mantenida no solo falla más, falla en el peor momento posible. Y cada falla no programada cuesta entre <strong className="text-slate-950">3 y 8 veces más</strong> que un mantenimiento preventivo bien ejecutado. No es opinión. Es matemática pura.
            </p>

            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6 my-8">
              <h4 className="font-black text-slate-950 text-base uppercase tracking-wider mb-3">
                ¿Por qué el mantenimiento tradicional se convierte en un laberinto?
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800 font-semibold">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                  <span>Técnicos sin especialización real.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                  <span>Talleres sin equipos de diagnóstico electrónico.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                  <span>Repuestos genéricos que fallan prematuramente.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                  <span>Presupuestos inflados, tardíos y sin respaldo técnico.</span>
                </li>
              </ul>
            </div>

            <p>
              Al final del año, cuando revisa los números, la pregunta es siempre la misma: <span className="italic font-bold">¿Por qué seguimos gastando tanto en mantenimiento si las máquinas siguen fallando?</span>
            </p>

            <p className="text-slate-950 font-extrabold text-base sm:text-lg text-center py-4 bg-slate-100/50 rounded-xl border border-slate-200">
              Porque no es mantenimiento lo que ha tenido hasta ahora. Es <span className="text-red-600">reparación reactiva</span> disfrazada de mantenimiento.
            </p>

            <p className="text-center font-black text-indigo-600 text-lg sm:text-xl pt-4">
              Eso termina hoy.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={scrollToForm}
              className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-indigo-400 hover:text-indigo-300 font-bold py-3.5 px-8 rounded-lg shadow-md transition-all cursor-pointer"
            >
              <span>Cortar el ciclo de fallas ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: Historia y Conexión Emocional (Dark Background - Charcoal/Steel Gray) */}
      <section className="py-20 md:py-28 bg-slate-900 border-t border-slate-800 text-slate-100 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Caso de Estudio</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-2">
              La Historia de Rodrigo
            </h2>
            <div className="h-1 w-16 bg-indigo-500 mx-auto mt-4" />
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-300">
            <p>
              Permítame contarle la historia de Rodrigo.
            </p>
            
            <p>
              Rodrigo lleva <strong className="text-white">14 años</strong> como jefe de mantenimiento en una empresa de movimiento de tierras en la región andina. Hombre de campo, conoce sus máquinas, las ha visto nacer y ha visto algunas morir antes de tiempo.
            </p>

            <p>
              Durante años, Rodrigo hizo lo que podía con lo que tenía: un equipo de mecánicos internos con buena voluntad pero formación desigual, proveedores de repuestos que a veces cumplían y a veces no, y un presupuesto de mantenimiento que siempre era el primero en recortarse cuando los números apretaban.
            </p>

            <p className="text-white font-bold text-base border-l-2 border-indigo-500 pl-4 py-1 italic">
              El punto de quiebre llegó un martes de octubre.
            </p>

            <p>
              Tres excavadoras fuera de servicio al mismo tiempo. Una por falla hidráulica. Una por sobrecalentamiento del motor. Una por un problema eléctrico intermitente que nadie había podido diagnosticar bien en tres meses. La empresa tenía un contrato de obra con fecha de entrega inamovible. Las penalidades por retraso eran del 2% del valor total del contrato por cada semana de demora.
            </p>

            <p>
              Rodrigo pasó 72 horas sin dormir bien, coordinando técnicos de emergencia, justificando ante la dirección, negociando con el cliente. Al final, sacaron el proyecto adelante, pero el costo de esas tres semanas de caos fue devastador: técnicos de emergencia, repuestos express con flete aéreo, horas extra del personal, penalidades parciales negociadas. Todo junto sumó más que los seis meses anteriores de "mantenimiento."
            </p>

            <p>
              Lo peor no fue el dinero. Lo peor fue que Rodrigo sabía, en el fondo, que lo había visto venir. Las señales estaban ahí. Nadie las había leído a tiempo.
            </p>

            <p className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 italic text-center text-slate-200">
              "Esa historia tiene miles de versiones distintas en cientos de empresas del sector. Quizás usted ya está viviendo la suya. Quizás ya tuvo su 'martes de octubre'. O quizás, si sigue por el mismo camino, está a punto de tenerlo."
            </p>

            <h4 className="text-center font-extrabold text-white text-base sm:text-lg pt-4">
              La buena noticia es que existe una forma diferente de hacer las cosas.
            </h4>
          </div>
        </div>
      </section>

      {/* SECTION 4: Presentación de la Solución (Light/Neutral Background - Slate Gray/Steel) */}
      <section id="la-solucion" className="py-20 md:py-28 bg-slate-100 text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image (generated diagnostics_tech) */}
            <div className="lg:col-span-5 order-last lg:order-first relative">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl filter blur-xl opacity-30" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
                <img 
                  src="/src/assets/images/diagnostics_tech_1783176625430.jpg" 
                  alt="Precision Heavy Machinery Electronics and Diagnostics" 
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
                
                <div className="p-4 bg-white border-t border-slate-100 text-center">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-widest">Tecnología de Precisión</p>
                  <p className="text-[10px] text-slate-500 font-medium">Diagnósticos reales y detallados antes de intervenir</p>
                </div>
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">La Alternativa Profesional</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Presentamos <span className="text-slate-950 font-black relative">Madrid Motor Mantenimiento</span>
              </h2>
              <div className="h-1.5 w-24 bg-indigo-500" />
              
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                <p className="font-bold text-slate-950 text-base sm:text-lg">
                  El servicio de mantenimiento especializado en maquinaria pesada diseñado específicamente para empresas que no pueden permitirse el lujo de que sus equipos fallen.
                </p>
                
                <p>
                  Madrid Motor no es un taller más. Es un sistema completo de gestión y ejecución de mantenimiento, respaldado por técnicos especializados con diagnóstico de precisión, protocolos estructurados y un seguimiento real que convierte el mantenimiento de su flota en una ventaja competitiva, no en un problema permanente.
                </p>

                <p>
                  Trabajamos con gerentes, jefes de mantenimiento y propietarios que entienden que una máquina en óptimas condiciones no es un gasto: es la columna vertebral de su operación.
                </p>

                <p className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  Con Madrid Motor, usted pasa de <strong className="text-red-650">apagar incendios constantemente</strong> a operar con una <strong className="text-emerald-600">flota predecible, confiable y eficiente</strong>. Del caos reactivo al control proactivo.
                </p>

                <p className="italic">
                  No prometemos magia. Prometemos un trabajo técnico serio, documentado, garantizado y orientado a un único objetivo: que su maquinaria esté operativa cuando usted la necesita, al costo que usted proyectó.
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={scrollToForm}
                  className="bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-indigo-400 hover:text-indigo-300 font-bold px-8 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer"
                >
                  <span>Agendar Diagnóstico Sin Costo</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Beneficios Clave (Highly readable - White Background) */}
      <section id="beneficios" className="py-20 md:py-28 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Ventajas Estratégicas</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              Lo que realmente cambia cuando trabaja con Madrid Motor
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-4 font-medium">
              Nuestra metodología transforma radicalmente la eficiencia y predictibilidad de sus equipos de alto valor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Benefit 1 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Clock className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  1. Eliminación de paradas no programadas
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Identificamos puntos de falla latentes antes de que ocurran. Sus máquinas no paran cuando no deben. Su operación fluye y sus contratos se cumplen.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <TrendingDown className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  2. Reducción real y medible de costos
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  El mantenimiento preventivo sistemático reduce costos totales entre un 25% y un 60% en comparación con el modelo puramente reactivo.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Award className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  3. Mayor vida útil de su maquinaria
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Una máquina bien mantenida dura significativamente más, extendiendo el retorno de inversión y postergando millonarios reemplazos de activos.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Activity className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  4. Diagnóstico técnico real, no suposiciones
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Contamos con equipos de diagnóstico electrónico especializado para identificar qué falla, por qué falla y qué necesita con absoluta certeza.
                </p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <UserCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  5. Tranquilidad y control para usted
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Al delegar la flota en un equipo técnico confiable con planes documentados, usted puede enfocarse en dirigir la operación sin correr detrás de fallas urgentes.
                </p>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <FileText className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  6. Documentación técnica completa
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Cada servicio queda registrado detalladamente en informes de entrega que protegen a su empresa ante aseguradoras, fabricantes y auditorías internas.
                </p>
              </div>
            </div>

            {/* Benefit 7 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Users className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  7. Relación de confianza a largo plazo
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Construimos un historial técnico continuo de sus equipos. Conocemos su maquinaria a la perfección, lo que agiliza decisiones futuras.
                </p>
              </div>
            </div>

            {/* Benefit 8 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <PhoneCall className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  8. Respuesta técnica ágil y organizada
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Entendemos que los tiempos muertos son inadmisibles. Estructuramos nuestro personal para dar soporte rápido, evitando burocracias inútiles.
                </p>
              </div>
            </div>

            {/* Benefit 9 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-350 bg-slate-50 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Sparkles className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-snug">
                  9. Asesoría técnica especializada integral
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  No nos limitamos a reparar. Le acompañamos con orientación clave para que sus operadores cuiden mejor la maquinaria en el trabajo diario.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: Características Principales (Contrasting Dark Background - Deep Charcoal/Zinc) */}
      <section className="py-20 md:py-28 bg-slate-900 text-white border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Servicio Integral</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-2">
              ¿Qué incluye específicamente el servicio Madrid Motor?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4 font-medium">
              Todo lo que su flota necesita para operar sin sorpresas bajo un mismo estándar técnico certificado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all">
              <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm sm:text-base text-white mb-2">Diagnóstico Técnico Integral</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Evaluaciones electrónicas, mecánicas, hidráulicas y eléctricas precisas según la maquinaria y falla detectada.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all">
              <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm sm:text-base text-white mb-2">Mantenimiento Programado</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Planes preventivos basados en horas reales de uso, ciclos de trabajo y desgaste, no calendarios estáticos genéricos.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all">
              <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm sm:text-base text-white mb-2">Mantenimiento Correctivo</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Reparaciones de fallas complejas mecánicas y electrónicas por personal calificado con años de experiencia en campo.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all">
              <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm sm:text-base text-white mb-2">Repuestos Trazables y Originales</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Uso exclusivo de insumos originales o de primera línea verificados (OEM) para asegurar la durabilidad de la reparación.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all">
              <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm sm:text-base text-white mb-2">Informe Técnico de Intervención</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Dosieres digitales completos con el detalle de trabajos realizados, repuestos colocados y lecturas técnicas clave.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all">
              <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm sm:text-base text-white mb-2">Planificación de Flota a Medida</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Planes dinámicos adaptados al historial de fallas previo, horas de trabajo y objetivos de disponibilidad anuales.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all">
              <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm sm:text-base text-white mb-2">Cotización Transparente Previa</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Conozca los desgloses de mano de obra y materiales antes de iniciar. Sin sorpresas ni cargos fantasmas al final.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/30 transition-all">
              <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm sm:text-base text-white mb-2">Seguimiento Post-Servicio Real</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Llamadas y visitas de monitoreo técnico para confirmar que la maquinaria rinde perfectamente después de la entrega.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: Cómo Funciona (Clean light background - Soft Off-White/Grey) */}
      <section id="como-funciona" className="py-20 md:py-28 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-indigo-650 uppercase tracking-widest">Protocolo Seguro</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              Proceso de Trabajo Claro y Predecible
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-4 font-medium">
              Estructurado para interferir lo menos posible con sus operaciones diarias y plazos de obra.
            </p>
          </div>

          <div className="relative">
            {/* Timeline connector line (desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              
              {/* Step 1 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4 border-2 border-white shadow-md">
                  1
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">Contacto Inicial</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-medium">
                  Usted nos contacta y nos describe la maquinaria, fallas reportadas y contexto de uso de su flota.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center mb-4 border-2 border-white shadow-md">
                  2
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">Evaluación Técnica</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-medium">
                  Técnicos certificados evalúan el equipo en sitio o taller con instrumental especializado para hallar la raíz del fallo.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center mb-4 border-2 border-white shadow-md">
                  3
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">Cotización Clara</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-medium">
                  Recibe un presupuesto integral desglosado con repuestos, tiempos comprometidos y precio garantizado.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center mb-4 border-2 border-white shadow-md">
                  4
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">Ejecución Experta</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-medium">
                  Tras su aprobación, ejecutamos el servicio de acuerdo con los protocolos de seguridad y tiempos acordados.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center mb-4 border-2 border-white shadow-md">
                  5
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">Entrega e Informe</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-medium">
                  Se le entrega el equipo al 100% con un informe técnico digital de los hallazgos y repuestos.
                </p>
              </div>

              {/* Step 6 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4 border-2 border-white shadow-md">
                  6
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">Seguimiento Real</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-medium">
                  Realizamos visitas de confirmación y le brindamos asesoría técnica de cortesía para potenciar su rendimiento.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Transformación (Interactive Before vs After - Custom block, Dark Grey background) */}
      <section className="py-20 md:py-28 bg-slate-950 text-white border-t border-slate-900 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Efecto Operativo</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-2 tracking-tight">
              La diferencia que Madrid Motor genera en su día a día
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 font-medium">
              Compare cómo cambia el control y rendimiento de su negocio antes y después de implementar nuestro sistema técnico.
            </p>
            
            {/* Interactive Toggle Tabs */}
            <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-xl mt-8">
              <button
                onClick={() => setActiveBeforeAfter('antes')}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeBeforeAfter === 'antes' 
                    ? 'bg-red-950/40 text-red-400 border border-red-900/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Antes de Madrid Motor (Reactivo)
              </button>
              <button
                onClick={() => setActiveBeforeAfter('despues')}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeBeforeAfter === 'despues' 
                    ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-900/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Después de Madrid Motor (Proactivo)
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeBeforeAfter === 'antes' ? (
              <motion.div
                key="antes-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/60 border border-red-500/20 rounded-2xl p-6 md:p-10 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <h4 className="text-lg font-bold text-red-400 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Caos Reactivo y Llamadas de Emergencia
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                      Sus mañanas comienzan revisando qué falló durante la noche. Las llamadas de emergencia son la rutina habitual. Los presupuestos de mantenimiento siempre se superan y nunca se entiende de manera clara el porqué. Los operadores pierden valiosas horas de trabajo esperando que el técnico genérico arribe e intente resolverlo. 
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">
                      Los contratos de obra se negocian con márgenes de riesgo exagerados porque "siempre hay algún problema técnico que retrasará la entrega." Al final del día, termina con la frustración de haber apagado incendios mecánicos en lugar de dirigir una empresa rentable.
                    </p>
                  </div>
                  <div className="md:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
                    <div className="text-red-500 font-black text-3xl mb-1">Costos x3</div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Por intervenciones de urgencia y fletes aéreos</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="despues-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/60 border border-indigo-550/25 rounded-2xl p-6 md:p-10 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-550" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <h4 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Flota Programada, Rentable y Confiable
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                      Su flota opera exactamente según el plan de mantenimiento, no según las fallas accidentales. Sus presupuestos anuales de mantenimiento son altamente predecibles porque están respaldados por planes de prevención y no por pánicos reactivos. Los operadores rinden al 100% y sus plazos contractuales se cumplen con exactitud.
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">
                      Cuando un equipo requiere atención técnica, usted lo sabe con antelación porque contamos con un sistema de sensores y análisis preventivos que lo detecta mucho antes de que ocurra una avería mayor. Su dirección ve números técnicos claros y usted termina el día con la total tranquilidad de tener el control total.
                    </p>
                  </div>
                  <div className="md:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
                    <div className="text-indigo-400 font-black text-3xl mb-1">Reducción 60%</div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">En el costo acumulado de mantenimiento correctivo</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-slate-500 text-[11px] sm:text-xs italic mt-8">
            La diferencia entre estos dos mundos no es una cuestión de suerte. Es el método técnico de Madrid Motor. Nuestra mecánica garantiza seguridad y buen precio.
          </p>

        </div>
      </section>

      {/* SECTION 9: Testimonios (Light/Medium background - Warm Grey / Zinc-100) */}
      <section id="testimonios" className="py-20 md:py-28 bg-slate-100 text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-indigo-650 uppercase tracking-widest">Opinión Profesional</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              Lo que dicen quienes ya trabajan con Madrid Motor
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-4 font-medium">
              Gerentes, jefes de taller y propietarios que lograron detener las paradas imprevistas.
            </p>
          </div>

          {/* Desktop Matrix of Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div className="absolute top-6 right-6 text-slate-100 font-serif text-5xl select-none leading-none pointer-events-none">
                  “
                </div>
                
                <div className="space-y-4">
                  {/* Star rating */}
                  <div className="flex gap-1 text-indigo-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-indigo-500" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed italic font-medium">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{testimonial.author}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-semibold">{testimonial.role}</p>
                  </div>
                  <span className="text-[9px] font-black text-indigo-600 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                    {testimonial.fleetSize}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: Bonos Incluidos (contrasting warm dark with amber borders - bg-zinc-900) */}
      <section className="py-20 md:py-28 bg-slate-900 text-white border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Adicionales Sin Costo</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Además del servicio principal, con Madrid Motor recibe:
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4 font-medium">
              Dos recursos tácticos clave integrados completamente gratis para potenciar el valor de su inversión.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {BONUSES.map((bonus, idx) => (
              <div 
                key={bonus.id}
                className="bg-slate-950 border border-indigo-500/25 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl"
              >
                {/* Free Badge */}
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-bl-xl tracking-wider">
                  {bonus.badge}
                </div>

                <div>
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 font-extrabold text-sm mb-5">
                    +{idx + 1}
                  </div>
                  <h3 className="font-extrabold text-white text-base sm:text-lg mb-3 max-w-[80%]">
                    {bonus.title}
                  </h3>
                  
                  <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full mb-4">
                    <span>Valor estimado:</span> 
                    <span className="line-through text-slate-500">{bonus.value}</span>
                    <span>/ ¡Gratis!</span>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                    {bonus.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: Garantía Sin Riesgo (Stunning secure card layout) */}
      <section className="py-20 md:py-28 bg-slate-950 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Guarantee Seal Background Design */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/5 rounded-full border border-indigo-500/10 pointer-events-none" />
            
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full mb-6">
              <Award className="w-10 h-10 stroke-[1.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Su tranquilidad está garantizada. Literalmente.
            </h2>
            
            <div className="h-1 w-20 bg-indigo-550 mx-auto mb-6" />

            <div className="space-y-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              <p className="font-bold text-white text-base sm:text-lg">
                Todo trabajo realizado por Madrid Motor tiene garantía absoluta sobre las reparaciones y los trabajos ejecutados.
              </p>
              
              <p>
                Esto significa que si algo no queda bien, volvemos a hacerlo bien. Sin discusiones estériles. Sin alegar que "eso fue provocado por otro problema secundario" y sin cobros adicionales por trabajos que debieron quedar perfectos desde el primer instante.
              </p>

              <p>
                Esta garantía existe porque confiamos plenamente en la capacidad y precisión técnica de nuestros ingenieros de campo. No hacemos promesas comerciales vacías: respaldamos cada intervención con nuestra firma técnica y profesional.
              </p>

              <p className="text-slate-400 italic">
                En un sector donde la informalidad es común y los talleres sin respaldo son la gran mayoría, esta garantía no es un detalle accesorio. Es la diferencia entre confiar verdaderamente y cruzar los dedos esperando que la máquina no vuelva a fallar.
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl inline-flex mx-auto">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía Firmada en cada Cotización Técnica</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: Inversión y Precios (Clear high-conversion price range, light background) */}
      <section className="py-20 md:py-28 bg-slate-50 text-slate-900 border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-indigo-650 uppercase tracking-widest">Inversión Justificada</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              Una inversión que se paga sola. A veces en la primera intervención.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-4 font-medium">
              Transparencia técnica total. Cada flota es única y su cotización se adapta exactamente a su realidad operativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* Info and comparison box */}
            <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">¿Por qué no hay tarifas fijas estándar?</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Los servicios de Madrid Motor se cotizan de manera estrictamente personalizada porque su flota, su tipo de maquinaria, sus condiciones de operación y sus necesidades específicas son completamente únicas. No creemos en precios fijos de catálogo que se aplican por igual a todos, porque ese enfoque genérico es exactamente el problema que estamos resolviendo.
                </p>
                <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20">
                  <span className="text-[10px] font-black text-indigo-850 uppercase tracking-wider block mb-1">Dato de Pérdida Crítica:</span>
                  <p className="text-slate-800 text-xs leading-relaxed font-semibold">
                    Una sola parada no programada de un equipo pesado en operación activa puede costar entre <strong className="text-slate-950">USD 1,500 y USD 8,000</strong> en pérdidas directas e indirectas, según el contexto de obra y el tiempo de reparación técnica de emergencia.
                  </p>
                </div>
              </div>
              <p className="text-slate-500 text-xs italic mt-4 font-semibold">
                La inversión en Madrid Motor no se compara con el costo del servicio. Se compara con el costo destructivo de no tenerlo.
              </p>
            </div>

            {/* Price ranges box */}
            <div className="md:col-span-5 bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-3 h-full bg-indigo-550" />
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Rango Técnico Estimado</span>
                  <h3 className="text-white font-extrabold text-lg mt-1">Esquema de Inversiones</h3>
                </div>

                <div className="space-y-4 border-t border-slate-800 pt-4">
                  <div>
                    <span className="text-slate-400 text-[10px] font-semibold uppercase block">Servicios Puntuales</span>
                    <div className="text-2xl font-black text-white mt-0.5">Desde USD 500</div>
                    <span className="text-[10px] text-slate-500 leading-none font-medium">Evaluaciones, calibraciones e intervenciones electrónicas específicas.</span>
                  </div>

                  <div className="border-t border-slate-800/60 pt-3">
                    <span className="text-slate-400 text-[10px] font-semibold uppercase block">Mantenimientos de Flota Completa</span>
                    <div className="text-2xl font-black text-indigo-400 mt-0.5">Hasta USD 5,000+</div>
                    <span className="text-[10px] text-slate-500 leading-none font-medium">Contratos de monitoreo preventivo continuos o revisiones integrales profundas.</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={scrollToForm}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg text-xs tracking-wider uppercase shadow-md transition-colors cursor-pointer"
                >
                  Solicitar Cotización Digital
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 13: Escasez, Urgencia + Sobre el Creador (Contrasting Dark background) */}
      <section className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Escasez y Urgencia */}
            <div className="lg:col-span-6 space-y-6 bg-slate-950/60 border border-slate-850 p-6 md:p-8 rounded-2xl">
              <span className="text-xs font-black text-red-500 uppercase tracking-widest">Capacidad Limitada</span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Cada día que pasa sin un plan de mantenimiento real, su maquinaria acumula un desgaste silencioso que mañana le costará el doble.
              </h3>
              <div className="h-0.5 w-16 bg-red-500" />
              <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                <p>
                  El deterioro de la maquinaria pesada no es un evento fortuito. Es un proceso físico continuo. Y ese proceso no espera a que usted disponga de tiempo libre para ocuparse del tema.
                </p>
                <p>
                  Hay algo crucial que considerar: nuestra capacidad de atención técnica es estrictamente limitada. El equipo de ingenieros de Madrid Motor trabaja con un número rigurosamente controlado de clientes corporativos para asegurar la máxima calidad y un tiempo de respuesta óptimo.
                </p>
                <p className="text-slate-300 font-semibold border-l-2 border-indigo-500 pl-3">
                  No somos un taller masivo de volumen. Somos un servicio técnico de precisión, y cuando nuestra agenda mensual de diagnósticos se completa, el siguiente interesado debe ingresar a lista de espera.
                </p>
              </div>
            </div>

            {/* Right: Sobre el Creador / Equipo */}
            <div className="lg:col-span-6 space-y-6 bg-slate-950/60 border border-slate-850 p-6 md:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">El Equipo Técnico</span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mt-1.5">
                  El equipo detrás de Madrid Motor entiende su mundo porque viene de su mundo.
                </h3>
                <div className="h-0.5 w-16 bg-indigo-500 mt-4" />
                
                <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-medium mt-4">
                  <p>
                    Madrid Motor Mantenimiento nació de una convicción simple pero poderosa: la maquinaria pesada merece mecánicos de alta especialización que comprendan su criticidad física, y las empresas merecen un servicio corporativo de alta precisión, estructurado y predecible.
                  </p>
                  <p>
                    Nuestro equipo está conformado por técnicos mecánicos especializados con formación oficial y experiencia acumulada en marcas líderes de maquinaria pesada. Han operado en condiciones reales de campo: minería a gran altitud, obras viales, excavaciones complejas y talleres de flota municipales.
                  </p>
                  <p>
                    No son técnicos generalistas que "también reparan maquinaria pesada". Son especialistas dedicados en exclusividad a esta disciplina técnica.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 13.5: Nuestras Instalaciones - Taller de Servicio Pesado */}
      <section id="instalaciones" className="py-20 md:py-28 bg-slate-950 text-white border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy: Info about the facilities */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Base de Operaciones</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.1]">
                Nuestras Instalaciones de <span className="text-indigo-400">Servicio Pesado</span>
              </h2>
              <div className="h-1.5 w-24 bg-indigo-500" />
              
              <div className="space-y-4 text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                <p className="font-bold text-slate-200 text-base sm:text-lg">
                  Contamos con un taller especializado y equipado estratégicamente para la recepción, diagnóstico e intervención integral de maquinaria de gran tonelaje.
                </p>
                <p>
                  Ubicados estratégicamente en la <span className="text-white font-semibold">Vía Atahualpa pasando el GAD Municipal</span>, nuestras instalaciones cuentan con la infraestructura física y de seguridad requerida para albergar excavadoras, rodillos, cargadores frontales y equipos viales.
                </p>
                <p>
                  Disponemos de zonas techadas de alta capacidad, áreas específicas para diagnósticos hidráulicos y electrónicos, y todo el herramental especializado necesario para intervenciones preventivas y correctivas seguras y eficientes.
                </p>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-850 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Zona Techada de Gran Capacidad
                </div>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-850 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                  Ubicación Estratégica
                </div>
              </div>
            </div>

            {/* Right Photo: The generated high-quality facility image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl filter blur-xl opacity-20" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
                <img 
                  src="/src/assets/images/real_workshop_photo_1783779791534.jpg" 
                  alt="Instalaciones de Taller y Servicio Técnico de Maquinaria Pesada" 
                  className="w-full h-auto object-cover aspect-[16/9] lg:aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="p-4 bg-slate-900 border-t border-slate-850 text-center">
                  <p className="text-xs font-black text-slate-200 uppercase tracking-widest">Taller de Servicio Madrid Motor</p>
                  <p className="text-[10px] text-slate-500 font-medium">Vía Atahualpa pasando el GAD Municipal</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 14: Preguntas Frecuentes (Interactive Accordion - Light theme / White Background) */}
      <section id="faq" className="py-20 md:py-28 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-indigo-650 uppercase tracking-widest">Soporte Informativo</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-4 font-medium">
              Respuestas directas y transparentes para despejar cualquier duda técnica antes de solicitar su cotización.
            </p>
          </div>

          <FAQ />
        </div>
      </section>

      {/* SECTION 15: Llamado a la Acción Final & LeadForm (Dark Background - Rich Cosmic Slate/Zinc) */}
      <section id="quote-form-section" className="py-20 md:py-28 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 text-white border-t border-slate-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy side */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Paso Decisivo</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                Su maquinaria no puede esperar. Su operación tampoco.
              </h2>
              
              <div className="h-1 w-20 bg-indigo-500" />
              
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-medium">
                <p className="font-bold text-white text-base">
                  Si llegó hasta este punto de la página, es porque reconoce que el mantenimiento de su valiosa flota es un asunto crítico que no puede seguir posponiéndose bajo el modelo reactivo tradicional.
                </p>
                <p>
                  Tiene dos opciones claras frente a usted en este momento exacto.
                </p>
                <p className="border-l-2 border-red-500 pl-4 py-1">
                  <strong className="text-red-400">Opción 1:</strong> Cerrar esta página, continuar con su rutina habitual y esperar que las máquinas sigan resistiendo los ciclos pesados... Hasta que la próxima falla detenga la obra.
                </p>
                <p className="border-l-2 border-emerald-500 pl-4 py-1">
                  <strong className="text-emerald-400">Opción 2:</strong> Dar el paso técnico profesional que cientos de gerentes y jefes ya dieron: delegar su flota en especialistas certificados que operan bajo un plan transparente, con garantías absolutas por escrito.
                </p>
                <p>
                  No le solicitamos una decisión apresurada. Le pedimos que dé el primer paso sin riesgo alguno: solicite su cotización personalizada y converse con nuestro asesor sin compromiso.
                </p>
              </div>

              {/* Direct Support Block */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Contacto WhatsApp Comercial</span>
                  <a href="https://wa.me/593990483273" target="_blank" rel="noreferrer" className="text-sm font-extrabold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1.5 mt-1">
                    <MessageSquare className="w-4 h-4 text-indigo-400" /> 0990483273
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Atención Laboral</span>
                  <span className="text-slate-300 font-semibold text-xs block mt-1">Lunes a Sábado: 06:00 AM - 06:00 pm</span>
                </div>
              </div>
            </div>

            {/* LeadForm side */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 shadow-2xl relative">
                <div className="absolute top-4 right-4 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-2.5 py-0.5 text-[9px] font-bold text-indigo-400 uppercase tracking-widest animate-pulse">
                  Últimos Cupos Disponibles
                </div>
                
                <LeadForm onSuccess={handleLeadSuccess} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-500 py-12 text-center text-xs font-medium font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 shadow-md">
              <img 
                src="/src/assets/images/madrid_motor_logo_1783780227291.jpg" 
                alt="Madrid Motor Logo" 
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-extrabold text-sm tracking-widest text-white">MADRID<span className="text-indigo-400"> MOTOR</span> Mantenimiento</span>
          </div>

          <p className="max-w-md mx-auto text-slate-400">
            Especialistas certificados en maquinaria pesada. Porque su operación no se detiene, su mantenimiento tampoco.
          </p>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 max-w-4xl mx-auto">
            <span>© {new Date().getFullYear()} Madrid Motor Mantenimiento. Todos los derechos reservados.</span>
            <div className="flex gap-6">
              <a href="#quote-form-section" className="hover:text-white transition-colors">Términos de Servicio</a>
              <a href="#quote-form-section" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#quote-form-section" className="hover:text-white transition-colors">Contacto Corporativo</a>
            </div>
          </div>
          
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/593990483273"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-[#34e073] group"
        aria-label="Contactar por WhatsApp"
        id="whatsapp-floating-button"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-white fill-white" />
          <Phone className="w-4 h-4 text-[#25D366] fill-[#25D366] absolute" />
        </div>
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          ¿En qué podemos ayudarte?
        </span>
      </a>

    </div>
  );
}
