export interface LeadRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  fleetSize: '1-5' | '6-15' | '16-30' | '31+';
  machineType: string;
  notes: string;
  createdAt: string;
  status: 'Pendiente' | 'En Contacto' | 'Cotizado' | 'Cerrado';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  fleetSize: string;
}

export interface BonusItem {
  id: string;
  title: string;
  value: string;
  description: string;
  badge: string;
}
