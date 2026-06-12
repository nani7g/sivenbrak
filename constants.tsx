import { Service, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'sap',
    title: 'SAP Integration',
    description: 'Connect SAP landscapes with enterprise applications, data platforms, and automation workflows.',
    icon: 'SI'
  },
  {
    id: 'webmethods',
    title: 'webMethods',
    description: 'Build reliable integration layers and API-led connectivity using Software AG webMethods.',
    icon: 'WM'
  },
  {
    id: 'java',
    title: 'Java',
    description: 'Develop and modernize secure Java applications, APIs, integrations, and enterprise back-end systems.',
    icon: 'JV'
  },
  {
    id: 'dotnet',
    title: '.Net',
    description: 'Build scalable .Net applications, services, and modernization programs for business-critical platforms.',
    icon: 'DN'
  },
  {
    id: 'testing',
    title: 'Testing',
    description: 'Improve release confidence through functional, automation, integration, regression, and performance testing.',
    icon: 'QA'
  },
  {
    id: 'dynamics',
    title: 'Microsoft Dynamics',
    description: 'Implement, customize, and integrate Microsoft Dynamics for CRM, ERP, and business operations.',
    icon: 'MD'
  },
  {
    id: 'ai-services',
    title: 'Machine Learning & Deep Learning',
    description: 'Design predictive models, intelligent workflows, and deep learning systems for data-driven decisions.',
    icon: 'ML'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    description: 'Create GenAI assistants, knowledge tools, content workflows, and enterprise automation experiences.',
    icon: 'GA'
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    description: 'Build goal-oriented AI agents that coordinate tasks, use tools, and support operational teams.',
    icon: 'AG'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Nityo Infotech',
    role: 'Client',
    company: 'Enterprise Technology',
    content: 'Sivenbrak Technologies is built to support enterprise teams with responsive consulting, practical engineering, and AI-ready delivery.',
    avatar: 'https://picsum.photos/seed/nityo/100/100'
  },
  {
    id: '2',
    author: 'XTech Consulting',
    role: 'Client',
    company: 'Consulting Partner',
    content: 'The Sivenbrak team brings focused implementation capability across SAP, webMethods, Microsoft Dynamics, application development, and modern AI solutions.',
    avatar: 'https://picsum.photos/seed/xtech/100/100'
  }
];
