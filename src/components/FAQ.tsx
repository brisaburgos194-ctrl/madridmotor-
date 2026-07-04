import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: '¿Trabajan con todo tipo de maquinaria pesada o solo con algunas marcas y modelos?',
    answer: 'Madrid Motor trabaja con una amplia gama de maquinaria pesada utilizada en construcción, minería, movimiento de tierras y obras viales: excavadoras, bulldozers, motoconformadoras, compactadoras, grúas, cargadores frontales, retroexcavadoras y más. Atendemos las principales marcas del mercado (Caterpillar, Komatsu, Volvo, Case, John Deere, Sany, Liugong, etc.). En el proceso de cotización inicial, evaluamos la especificidad técnica de su equipo para confirmar que tenemos la capacidad y las herramientas necesarias para intervenir correctamente. No tomamos trabajos que no podemos hacer bien.'
  },
  {
    question: '¿Cómo funciona exactamente la garantía sobre los trabajos realizados?',
    answer: 'La garantía cubre los trabajos de reparación y mantenimiento ejecutados por nuestro equipo técnico. Si una reparación realizada por Madrid Motor presenta fallas relacionadas con el trabajo efectuado dentro del período de garantía, volvemos a intervenir sin costo adicional. Los términos específicos de la garantía se detallan en la cotización y en el informe técnico de cada servicio, ya que pueden variar según el tipo de trabajo realizado. En la conversación inicial con nuestro asesor, usted puede consultar todos los detalles específicos para su caso.'
  },
  {
    question: '¿Cuánto tiempo toma el proceso desde que los contacto hasta que tienen mi maquinaria operativa?',
    answer: 'Depende del tipo de servicio, la complejidad de la falla y la disponibilidad de repuestos específicos. Lo que sí garantizamos es transparencia en los tiempos desde el diagnóstico: antes de comenzar cualquier trabajo, usted sabe cuánto tiempo tomará la intervención. Para mantenimientos preventivos programados, los tiempos se planifican con anticipación para minimizar el impacto en su operación. Para correctivos de urgencia, trabajamos con la mayor agilidad posible sin sacrificar la calidad del trabajo.'
  },
  {
    question: '¿Puedo contratar un plan de mantenimiento continuo para toda mi flota o solo servicios puntuales?',
    answer: 'Ambas opciones están disponibles. Puede contratar servicios puntuales según necesidad o establecer un plan de mantenimiento programado para su flota completa. La segunda opción, además de ser técnicamente superior porque permite una gestión preventiva real, le da acceso a las condiciones preferenciales de clientes con contrato, incluyendo descuentos en tarifas de mano de obra y prioridad absoluta de atención. Nuestro asesor comercial puede ayudarle a evaluar cuál es el enfoque más conveniente para el tamaño y las características de su operación.'
  },
  {
    question: '¿Qué pasa si durante el diagnóstico encuentran problemas adicionales a los que reporté?',
    answer: 'Eso ocurre con frecuencia en maquinaria que no ha tenido mantenimiento preventivo sistemático. En ese caso, le informamos de inmediato qué encontramos, le explicamos el nivel de urgencia de cada hallazgo y le presentamos una cotización ampliada para que usted decida qué autorizar. Nunca ejecutamos trabajos adicionales sin su aprobación expresa. Usted siempre tiene el control de qué se hace y qué se posterga.'
  },
  {
    question: '¿Los repuestos que usan son originales? ¿Cómo sé que son de calidad?',
    answer: 'Trabajamos con repuestos originales del fabricante o de marcas de primera línea (OEM) con respaldo de calidad verificado. En la cotización especificamos claramente qué tipo de repuesto se va a utilizar en cada caso y su procedencia. Entendemos que el repuesto es tan importante como el trabajo técnico: una reparación bien hecha con un repuesto de baja calidad vuelve a fallar, y eso no le sirve a nadie, ni a usted ni a nuestra reputación.'
  },
  {
    question: '¿Cómo solicito una cotización?',
    answer: 'El proceso es simple. Contacte a nuestro asesor comercial especializado a través del formulario de cotización de esta página o presionando el botón de contacto directo. Nos describirá su situación, el tipo de maquinaria, la falla o el servicio que necesita y el contexto de su operación. A partir de ahí, coordinamos el diagnóstico técnico y le presentamos una cotización personalizada, detallada y sin compromiso. Sin letras pequeñas. Sin presión para decidir en el acto.'
  },
  {
    question: '¿Dónde estamos ubicados?',
    answer: 'Vía Atahualpa pasando el GAD Municipal.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div 
            key={index} 
            className="border border-slate-200/80 rounded-xl overflow-hidden bg-white hover:border-slate-300 transition-colors shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4.5 text-left flex items-start justify-between gap-4 font-sans cursor-pointer group"
            >
              <div className="flex gap-3">
                <HelpCircle className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                <span className="font-semibold text-slate-900 text-sm md:text-base leading-snug group-hover:text-slate-950">
                  {item.question}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400 group-hover:text-slate-600 mt-1 flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-5 pl-14 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100/80 pt-4 bg-slate-50/50">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
