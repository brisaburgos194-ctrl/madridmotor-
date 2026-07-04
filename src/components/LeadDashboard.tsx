import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, X, Check, Eye, Trash2, Calendar, ShieldCheck, Clock, UserCheck, MessageSquare } from 'lucide-react';
import { LeadRequest } from '../types';

interface LeadDashboardProps {
  lastUpdated: number;
  onClear: () => void;
}

const PRELOADED_LEADS: LeadRequest[] = [
  {
    id: 'lead_jorge',
    fullName: 'Jorge Hernández',
    email: 'j.hernandez@vialesnordeste.com',
    phone: '+51 983 221 002',
    companyName: 'Constructora Viales del Nordeste',
    fleetSize: '6-15',
    machineType: 'Motoconformadoras',
    notes: 'Necesitamos programar el mantenimiento preventivo de 8 motoconformadoras que inician obra el próximo mes.',
    createdAt: new Date(Date.now() - 3600000 * 2.5).toISOString(), // 2.5 hours ago
    status: 'Cotizado'
  },
  {
    id: 'lead_carlos',
    fullName: 'Carlos Mendoza',
    email: 'carlos.mendoza@tierrasandes.pe',
    phone: '+51 912 345 678',
    companyName: 'Movimiento de Tierras Andes',
    fleetSize: '16-30',
    machineType: 'Excavadoras',
    notes: 'Una excavadora CAT 320 tiene pérdida de fuerza hidráulica en caliente. Urgente.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    status: 'En Contacto'
  }
];

export default function LeadDashboard({ lastUpdated, onClear }: LeadDashboardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [leads, setLeads] = useState<LeadRequest[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadRequest | null>(null);

  // Load leads from localStorage + preloaded leads
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('madrid_motor_leads') || localStorage.getItem('heavyfix_leads') || '[]');
    // Combine local first, then preloaded
    const combined = [...local];
    // Avoid duplication
    PRELOADED_LEADS.forEach(pLead => {
      if (!combined.some(c => c.id === pLead.id)) {
        combined.push(pLead);
      }
    });
    setLeads(combined);
  }, [lastUpdated, isOpen]);

  const updateLeadStatus = (leadId: string, newStatus: LeadRequest['status']) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    
    // Save only local leads to localStorage (not preloaded unless modified)
    const localOnly = updated.filter(l => !l.id.startsWith('lead_jorge') && !l.id.startsWith('lead_carlos'));
    localStorage.setItem('madrid_motor_leads', JSON.stringify(localOnly));
    setLeads(updated);
    
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const deleteLead = (leadId: string) => {
    const updated = leads.filter(l => l.id !== leadId);
    const localOnly = updated.filter(l => !l.id.startsWith('lead_jorge') && !l.id.startsWith('lead_carlos'));
    localStorage.setItem('madrid_motor_leads', JSON.stringify(localOnly));
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(null);
    }
  };

  const getStatusColor = (status: LeadRequest['status']) => {
    switch (status) {
      case 'Pendiente': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'En Contacto': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Cotizado': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Cerrado': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/50 shadow-2xl px-4 py-3 rounded-full font-bold text-xs tracking-wider transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
        >
          <Database className="w-4 h-4 animate-bounce" />
          <span>MONITOR DE LEADS</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-black text-white">
            {leads.length}
          </span>
        </button>
      </div>

      {/* Slide-over Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-lg bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col font-sans"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase">Buzón de Conversiones</h3>
                    <p className="text-[10px] text-slate-400">Inspeccione los prospectos capturados por la Landing Page</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Leads List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {leads.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <p className="text-sm">No hay prospectos en este navegador todavía.</p>
                    <p className="text-xs mt-1">Utilice el formulario de cotización en la landing page para simular conversiones en tiempo real.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leads.map((lead) => (
                      <div 
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          selectedLead?.id === lead.id 
                            ? 'bg-slate-900 border-indigo-500/40 shadow-lg' 
                            : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-semibold text-xs text-white">{lead.fullName}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">{lead.companyName}</p>
                          </div>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-3 border-t border-slate-800/60 pt-2">
                          <div>
                            <span className="text-slate-500">Flota:</span> <strong className="text-slate-300">{lead.fleetSize} máq.</strong>
                          </div>
                          <div>
                            <span className="text-slate-500">Equipo:</span> <strong className="text-indigo-400 truncate block">{lead.machineType}</strong>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-600" />
                            {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold text-[9px]">
                            <Eye className="w-3 h-3" /> VER DETALLES
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Lead Drawer/Details */}
              <AnimatePresence>
                {selectedLead && (
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    className="absolute inset-x-0 bottom-0 bg-slate-900 border-t border-slate-800 p-6 shadow-2xl z-10 max-h-[85%] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Detalles de la Conversión</h4>
                      </div>
                      <button 
                        onClick={() => setSelectedLead(null)}
                        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Status Selector */}
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Estado del Prospecto:</span>
                        <div className="flex gap-1.5">
                          {(['Pendiente', 'En Contacto', 'Cotizado', 'Cerrado'] as const).map((status) => (
                            <button
                              key={status}
                              onClick={() => updateLeadStatus(selectedLead.id, status)}
                              className={`text-[9px] font-bold px-2 py-1 rounded transition-all cursor-pointer ${
                                selectedLead.status === status
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Client Info Grid */}
                      <div className="grid grid-cols-2 gap-3.5 bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
                        <div>
                          <span className="text-slate-500 block mb-0.5 text-[9px] uppercase font-bold">Contacto:</span>
                          <span className="text-white font-semibold text-xs">{selectedLead.fullName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-0.5 text-[9px] uppercase font-bold">Empresa:</span>
                          <span className="text-white font-semibold text-xs">{selectedLead.companyName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-0.5 text-[9px] uppercase font-bold">Teléfono:</span>
                          <a href={`tel:${selectedLead.phone}`} className="text-indigo-400 hover:underline font-semibold block text-xs">
                            {selectedLead.phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-0.5 text-[9px] uppercase font-bold">Email:</span>
                          <a href={`mailto:${selectedLead.email}`} className="text-indigo-400 hover:underline block text-xs truncate">
                            {selectedLead.email}
                          </a>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-0.5 text-[9px] uppercase font-bold">Flota Estimada:</span>
                          <span className="text-slate-300 text-xs font-semibold">{selectedLead.fleetSize} máquinas</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-0.5 text-[9px] uppercase font-bold">Equipo Crítico:</span>
                          <span className="text-indigo-400 text-xs font-semibold">{selectedLead.machineType}</span>
                        </div>
                      </div>

                      {/* Client Message */}
                      <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                        <span className="text-slate-500 block mb-1 text-[9px] uppercase font-bold flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-indigo-500/70" /> Detalles de la Falla / Requerimiento:
                        </span>
                        <p className="text-slate-300 leading-relaxed italic text-xs bg-slate-950 p-2.5 rounded border border-slate-850">
                          "{selectedLead.notes || 'El cliente no especificó comentarios adicionales.'}"
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2.5 pt-2">
                        <a 
                          href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Contactar WhatsApp</span>
                        </a>
                        <button
                          onClick={() => deleteLead(selectedLead.id)}
                          className="px-3.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 border border-red-900/40 hover:border-red-500/50 rounded-lg cursor-pointer transition-colors"
                          title="Eliminar Prospecto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400/80" /> Persistencia Local activa
                </span>
                <button 
                  onClick={() => {
                    localStorage.removeItem('madrid_motor_leads');
                    localStorage.removeItem('heavyfix_leads');
                    onClear();
                    setSelectedLead(null);
                  }}
                  className="text-red-500/70 hover:text-red-400 transition-colors cursor-pointer"
                >
                  Limpiar buzón
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
