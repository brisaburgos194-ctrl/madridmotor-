import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Send, ArrowRight, Loader2, PhoneCall, Check } from 'lucide-react';
import { LeadRequest } from '../types';

interface LeadFormProps {
  onSuccess: (lead: LeadRequest) => void;
  ctaText?: string;
  isCompact?: boolean;
}

export default function LeadForm({ onSuccess, ctaText = "Solicitar Cotización Personalizada", isCompact = false }: LeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    fleetSize: '1-5' as '1-5' | '6-15' | '16-30' | '31+',
    machineType: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre es obligatorio.';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono o WhatsApp es obligatorio.';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'El teléfono debe tener un formato válido.';
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'El nombre de la empresa es obligatorio.';
    if (!formData.machineType.trim()) newErrors.machineType = 'Seleccione o escriba el tipo de maquinaria.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate server side request with 1.2s delay
    setTimeout(() => {
      const newLead: LeadRequest = {
        id: 'lead_' + Math.random().toString(36).substring(2, 9),
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'Pendiente'
      };

      // Save to localStorage
      const existingLeads = JSON.parse(localStorage.getItem('madrid_motor_leads') || localStorage.getItem('heavyfix_leads') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('madrid_motor_leads', JSON.stringify(existingLeads));

      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess(newLead);

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        fleetSize: '1-5',
        machineType: '',
        notes: ''
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for that field
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-indigo-500/30 rounded-xl p-8 text-center text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500" />
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
          ¡Solicitud Recibida Correctamente!
        </h3>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto">
          Hemos recibido los detalles de su flota. Un asesor técnico especializado de Madrid Motor ya está analizando sus datos y se comunicará con usted en menos de <strong className="text-indigo-400">30 minutos</strong> vía WhatsApp o llamada para coordinar el diagnóstico.
        </p>

        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 mb-6 text-left max-w-sm mx-auto">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Próximos pasos técnicos:</h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px]">1</span>
              <span>Llamada de diagnóstico preliminar de flota (sin costo).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px]">2</span>
              <span>Asignación de técnico certificado según su tipo de maquinaria.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px]">3</span>
              <span>Envío de cotización digital con desglose transparente.</span>
            </li>
          </ul>
        </div>

        <button 
          onClick={() => setIsSuccess(false)}
          className="text-xs text-slate-400 hover:text-white transition-colors underline"
        >
          Enviar otra solicitud para una máquina distinta
        </button>
      </motion.div>
    );
  }

  return (
    <form id="contact-lead-form" onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1.5 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          Solicitud de Cotización y Diagnóstico
        </h3>
        <p className="text-xs text-slate-400">
          Complete los datos de su flota para recibir una propuesta personalizada sin compromiso.
        </p>
      </div>

      <div className="space-y-4">
        {/* Nombre Completo */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Nombre Completo *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ej: Ing. Rodrigo Silva"
            className={`w-full px-4 py-2.5 bg-slate-800/70 border ${errors.fullName ? 'border-red-500' : 'border-slate-700 focus:border-indigo-500'} rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-sans`}
          />
          {errors.fullName && (
            <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.fullName}
            </span>
          )}
        </div>

        {/* Empresa & Teléfono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Nombre de la Empresa *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Ej: Constructora Andes S.A."
              className={`w-full px-4 py-2.5 bg-slate-800/70 border ${errors.companyName ? 'border-red-500' : 'border-slate-700 focus:border-indigo-500'} rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-sans`}
            />
            {errors.companyName && (
              <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.companyName}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Teléfono / WhatsApp *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ej: +51 987 654 321"
              className={`w-full px-4 py-2.5 bg-slate-800/70 border ${errors.phone ? 'border-red-500' : 'border-slate-700 focus:border-indigo-500'} rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-sans`}
            />
            {errors.phone && (
              <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </span>
            )}
          </div>
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Correo Electrónico Laboral *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: r.silva@constructoraandes.com"
            className={`w-full px-4 py-2.5 bg-slate-800/70 border ${errors.email ? 'border-red-500' : 'border-slate-700 focus:border-indigo-500'} rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-sans`}
          />
          {errors.email && (
            <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </span>
          )}
        </div>

        {/* Tamaño de Flota & Tipo de Maquinaria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Tamaño de su Flota</label>
            <div className="relative">
              <select
                name="fleetSize"
                value={formData.fleetSize}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none transition-colors font-sans cursor-pointer"
              >
                <option value="1-5">1 - 5 equipos</option>
                <option value="6-15">6 - 15 equipos</option>
                <option value="16-30">16 - 30 equipos</option>
                <option value="31+">Más de 30 equipos</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <Send className="w-3 h-3 rotate-90" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Tipo de Maquinaria Principal *</label>
            <select
              name="machineType"
              value={formData.machineType}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-slate-800/70 border ${errors.machineType ? 'border-red-500' : 'border-slate-700 focus:border-indigo-500'} rounded-lg text-sm text-white focus:outline-none appearance-none transition-colors font-sans cursor-pointer`}
            >
              <option value="">Seleccione una opción...</option>
              <option value="Excavadoras">Excavadoras Hidráulicas</option>
              <option value="Bulldozers">Bulldozers / Tractores de Oruga</option>
              <option value="Cargadores">Cargadores Frontales</option>
              <option value="Retroexcavadoras">Retroexcavadoras</option>
              <option value="Motoconformadoras">Motoconformadoras</option>
              <option value="Múltiples / Flota Mixta">Múltiples / Flota Mixta</option>
              <option value="Otros">Otros Equipos Pesados</option>
            </select>
            {errors.machineType && (
              <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.machineType}
              </span>
            )}
          </div>
        </div>

        {/* Notas / Mensaje */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Detalle de la falla o servicio requerido <span className="text-slate-500">(Opcional)</span>
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Describa brevemente qué equipos necesitan mantenimiento o qué fallas están presentando..."
            rows={isCompact ? 2 : 3}
            className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 focus:border-indigo-500 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-sans resize-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white text-sm font-bold py-3.5 px-6 rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Procesando diagnóstico de flota...
            </>
          ) : (
            <>
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Check className="w-3.5 h-3.5 text-indigo-400" /> Garantía de Satisfacción
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        <span className="flex items-center gap-1">
          <Check className="w-3.5 h-3.5 text-indigo-400" /> Diagnóstico Preciso
        </span>
      </div>
    </form>
  );
}
