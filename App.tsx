
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import { SERVICES, TESTIMONIALS } from './constants';

const App: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [liveVisitors, setLiveVisitors] = useState(142);
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);
  
  const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'firstName' | 'lastName' | 'phone' | 'email', string>>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
    goal: 'SAP Integration'
  });

  // Simulated Live Visitor update
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % (TESTIMONIALS.length || 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + (TESTIMONIALS.length || 1)) % (TESTIMONIALS.length || 1));
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const isValidPhone = (value: string) => /^[0-9+\-()\s]{7,20}$/.test(value.trim());
  const isFormValid =
    formData.firstName.trim().length >= 2 &&
    formData.lastName.trim().length >= 1 &&
    isValidEmail(formData.email) &&
    isValidPhone(formData.phone);

  const validateForm = () => {
    const nextErrors: Partial<Record<'firstName' | 'lastName' | 'phone' | 'email', string>> = {};

    if (formData.firstName.trim().length < 1) {
      nextErrors.firstName = 'Please enter a valid first name.';
    }

    if (formData.lastName.trim().length < 1) {
      nextErrors.lastName = 'Please enter a valid last name.';
    }

    if (!isValidEmail(formData.email)) {
      nextErrors.email = 'The email format is incorrect.';
    }

    if (!isValidPhone(formData.phone)) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!validateForm()) {
      setFormState('error');
      return;
    }

    if (!formEndpoint) {
      setFormError('Email notifications are not configured yet. Please call us at 9618495969.');
      setFormState('error');
      return;
    }

    try {
      setFormState('sending');
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        service: formData.goal,
        company: 'Sivenbrak Technologies website',
        submittedAt: new Date().toISOString(),
      }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setFormState('success');
      setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '', goal: 'SAP Integration' });
      setFieldErrors({});
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      setFormError('We could not send your request. Please call us at 9618495969.');
      setFormState('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'firstName' || name === 'lastName' || name === 'phone' || name === 'email') {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const policyContent = {
    privacy: {
      title: 'Privacy Policy',
      intro: 'SIVENBRAK TECHNOLOGIES PRIVATE LIMITED respects your privacy and handles enquiry information responsibly.',
      points: [
        'We collect the details you submit through this website, such as name, email, phone number, project interest, and message context.',
        'We use this information to respond to business enquiries, provide consulting information, and coordinate service discussions.',
        'We do not sell visitor information. Information may be shared only with authorized team members or service providers needed to support the enquiry.',
        'To request correction or removal of submitted information, contact Sivenbrak Technologies at 9618495969.'
      ]
    },
    terms: {
      title: 'Terms of Use',
      intro: 'By using this website, you agree to use the information here for lawful business and evaluation purposes.',
      points: [
        'Website content is provided for general information about Sivenbrak Technologies services and may be updated without notice.',
        'Submitting an enquiry does not create a service contract. Any project engagement requires separate written confirmation.',
        'All service names, client references, and brand materials should not be copied or reused without permission.',
        'For questions about these terms, contact Sivenbrak Technologies at 9618495969.'
      ]
    }
  };

  const clientHighlights = [
    {
      id: 'nityo',
      label: 'Nityo Infotech',
    },
    {
      id: 'xtech',
      label: 'XTech Consulting',
    },
    {
      id: 'intelliswift',
      label: 'intelliswift',
      subLabel: 'An LTTS Company',
      hasSubLabel: true
    }
  ];

  return (
    <div className="min-h-screen selection:bg-rose-100 selection:text-rose-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/80 backdrop-blur shadow-sm border border-rose-100 text-rose-700 rounded-full text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              Enterprise Integration & AI Consulting
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Reliable Technology Delivery for <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-red-500">Growing</span> Businesses.
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
              Sivenbrak Technologies is a new-age IT consulting company built for teams that need practical engineering, fast communication, and accountable delivery across SAP, webMethods, Java, .Net, Microsoft Dynamics, testing, and AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => scrollToElement('contact')}
                className="w-full sm:w-auto text-center px-8 py-4 bg-rose-600 text-white rounded-xl font-bold text-lg hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 hover:-translate-y-1 active:scale-95"
              >
                Start Your Transformation
              </button>
              <button 
                onClick={() => scrollToElement('services')}
                className="w-full sm:w-auto text-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:border-rose-600 transition-all active:scale-95"
              >
                Explore Solutions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Activity Ribbon */}
      <div className="bg-slate-900 py-3 overflow-hidden whitespace-nowrap">
        <div className="flex items-center animate-marquee gap-12 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          {[1,2,3,4].map(i => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2"><span className="text-green-500">ON</span> 24/7 Delivery Support</span><span className="flex items-center gap-2"><span className="text-rose-500">+</span> SAP Integration Delivery</span><span className="flex items-center gap-2"><span className="text-red-500">#</span> webMethods & Dynamics Programs</span><span className="flex items-center gap-2"><span className="text-amber-500">^</span> AI Solution Teams Online</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Focused Delivery', value: '100%' },
              { label: 'Core Services', value: '9' },
              { label: 'Client-First Approach', value: '24/7' },
              { label: 'Active Sessions', value: liveVisitors.toString() },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl font-bold text-rose-600 mb-1 transition-transform group-hover:scale-110">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Enterprise-Grade Services</h2>
            <p className="text-lg text-slate-600">We help companies move ideas into dependable systems with careful planning, hands-on implementation, and support that stays close to the business outcome.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(SERVICES) && SERVICES.map((service) => (
              <div key={service.id} className="group p-10 bg-white border border-rose-100 rounded-[2rem] hover:border-rose-600 transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-lg font-black text-rose-700 mb-8 group-hover:bg-rose-100 transition-colors shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8">{service.description}</p>
                <button 
                  onClick={() => scrollToElement('contact')}
                  className="text-rose-600 font-bold inline-flex items-center gap-2 group/link hover:gap-4 transition-all"
                >
                  Get started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-rose-950 text-white overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Clients</h2>
              <p className="text-rose-100/70 text-lg">We are growing through focused partnerships, transparent execution, and the kind of responsive support clients expect from a committed technology team.</p>
              <div className="grid gap-4 mt-8 sm:grid-cols-2 xl:grid-cols-3">
                {clientHighlights.map((client) => (
                  <div
                    key={client.id}
                    className="rounded-2xl shadow-lg border px-6 py-5 min-h-[96px] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-rose-800 via-rose-700 to-red-600 border-rose-700/70"
                  >
                    <div className="leading-tight">
                      <div className="text-2xl lg:text-3xl font-extrabold tracking-tight break-words whitespace-normal text-white">
                        {client.label}
                      </div>
                      {'subLabel' in client && client.subLabel ? (
                        <div className="mt-1 text-sm font-semibold text-white/80 break-words whitespace-normal">{client.subLabel}</div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={prevTestimonial} className="p-4 border border-rose-800 rounded-full hover:bg-rose-900 transition-all hover:border-rose-500 active:scale-90" aria-label="Previous">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={nextTestimonial} className="p-4 border border-rose-800 rounded-full hover:bg-rose-900 transition-all hover:border-rose-500 active:scale-90" aria-label="Next">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {Array.isArray(TESTIMONIALS) && TESTIMONIALS.map((t, idx) => (
              <div 
                key={t.id} 
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  idx === activeTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
                }`}
              >
                <div className="p-12 bg-white/10 border border-rose-800 rounded-[3rem] relative h-full backdrop-blur-sm">
                  <div className="absolute top-12 right-12 text-8xl text-rose-300/20 font-serif">"</div>
                  <p className="text-2xl md:text-3xl text-slate-200 leading-relaxed mb-12 relative z-10 font-light italic">"{t.content}"</p>
                  <div className="flex items-center gap-5">
                    <img src={t.avatar} alt={t.author} className="w-16 h-16 rounded-full border-2 border-rose-500 object-cover" />
                    <div>
                      <div className="font-bold text-xl">{t.author}</div>
                      <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest">{t.role} - {t.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-600 rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-2xl shadow-rose-200">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-400/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="flex-1 relative z-10 text-white">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tighter leading-tight">Connect with Sivenbrak.</h2>
              <p className="text-rose-100 text-xl mb-12 leading-relaxed max-w-xl">
                Work directly with a director-led team that keeps communication clear, delivery practical, and every engagement focused on measurable value from day one.
              </p>
              <div className="space-y-6">
                <a href="tel:+919618495969" className="grid grid-cols-[3rem_1fr] items-center gap-5 group w-fit">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 5.5C2 4.1 3.1 3 4.5 3h2.1c.9 0 1.7.6 2 1.5l.7 2.4c.2.8 0 1.7-.7 2.2l-1.2.9c1.2 2.4 3.1 4.3 5.5 5.5l.9-1.2c.5-.7 1.4-.9 2.2-.7l2.4.7c.9.3 1.5 1.1 1.5 2V19.5c0 1.4-1.1 2.5-2.5 2.5H17C8.7 22 2 15.3 2 7V5.5Z" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold group-hover:translate-x-1 transition-transform">9618495969</span>
                </a>
                <a href="mailto:sales@sivenbrak.com" className="grid grid-cols-[3rem_1fr] items-center gap-5 group w-fit">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16v12H4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 7 8 6 8-6" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold group-hover:translate-x-1 transition-transform">sales@sivenbrak.com</span>
                </a>
                <div className="grid grid-cols-[3rem_1fr] items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21a8 8 0 0 1 16 0" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold">Director: Navya Yedla</span>
                </div>
                <div className="grid grid-cols-[3rem_1fr] items-start gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold leading-relaxed">Plot No208/P, Rd No 7, Devendra Nagar, Gajularamaram, Hyderabad - 500055, Telangana</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 max-w-xl bg-white p-10 rounded-[3rem] shadow-2xl relative z-10">
              {formState === 'success' ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner animate-bounce">✓</div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Sent Successfully</h3>
                  <p className="text-slate-500 text-lg">A senior advisor will contact you within one business day.</p>
                  <button onClick={() => setFormState('idle')} className="mt-10 text-rose-600 font-bold hover:underline text-lg">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-6 py-4 bg-rose-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-medium" />
                    {fieldErrors.firstName && <p className="text-sm font-semibold text-rose-600">{fieldErrors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-6 py-4 bg-rose-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-medium" />
                    {fieldErrors.lastName && <p className="text-sm font-semibold text-rose-600">{fieldErrors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Work Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-6 py-4 bg-rose-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-medium" />
                    {fieldErrors.email && <p className="text-sm font-semibold text-rose-600">{fieldErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-6 py-4 bg-rose-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-medium" placeholder="Enter phone number" />
                    {fieldErrors.phone && <p className="text-sm font-semibold text-rose-600">{fieldErrors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Project Strategy</label>
                    <select name="goal" value={formData.goal} onChange={handleInputChange} className="w-full px-6 py-4 bg-rose-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-medium appearance-none">
                      <option>SAP Integration</option><option>webMethods</option><option>Java</option><option>.Net</option><option>Testing</option><option>Microsoft Dynamics</option><option>Machine Learning / Deep Learning</option><option>Generative AI</option><option>Agentic AI</option><option>Others</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us briefly what you need..."
                      className="w-full px-6 py-4 bg-rose-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-medium resize-y"
                    />
                  </div>
                  {formState === 'error' && (
                    <div className="rounded-2xl bg-rose-50 border border-rose-100 px-5 py-4 text-rose-700 font-semibold">
                      {formError}
                    </div>
                  )}
                  <button type="submit" disabled={formState === 'sending' || !isFormValid} className="w-full py-5 bg-rose-600 text-white rounded-2xl font-bold text-xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-100 flex items-center justify-center gap-4 disabled:cursor-not-allowed disabled:opacity-50">
                    {formState === 'sending' ? 'Connecting...' : 'Secure Consultation'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/sivenbrak-logo.png"
                  alt="Sivenbrak Technologies"
                  className="h-14 w-auto max-w-[260px] object-contain"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                System Status: All Nodes Operational
              </div>
            </div>
            <div className="flex gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <button type="button" onClick={() => setActivePolicy('privacy')} className="hover:text-rose-600 transition-colors uppercase tracking-widest">
                Privacy
              </button>
              <button type="button" onClick={() => setActivePolicy('terms')} className="hover:text-rose-600 transition-colors uppercase tracking-widest">
                Terms
              </button>
              <button type="button" onClick={() => scrollToElement('contact')} className="hover:text-rose-600 transition-colors uppercase tracking-widest">
                Contact
              </button>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} SIVENBRAK TECHNOLOGIES PRIVATE LIMITED. Hyderabad, Telangana. 
            <p className="mt-4 font-medium opacity-75">Director: Navya Yedla - Contact: 9618495969</p>
          </div>
        </div>
      </footer>

      {activePolicy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-slate-950/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="policy-title">
          <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="flex items-start justify-between gap-6 p-8 border-b border-rose-100">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-600 mb-3">Sivenbrak Technologies</p>
                <h2 id="policy-title" className="text-3xl font-extrabold text-slate-900 tracking-tight">{policyContent[activePolicy].title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                className="w-11 h-11 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 flex items-center justify-center transition-colors"
                aria-label="Close policy"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">{policyContent[activePolicy].intro}</p>
              <div className="space-y-4">
                {policyContent[activePolicy].points.map((point) => (
                  <div key={point} className="grid grid-cols-[0.75rem_1fr] gap-4 text-slate-600 leading-relaxed">
                    <span className="mt-2 h-2 w-2 rounded-full bg-rose-500"></span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-slate-400">
                Registered office: Plot No208/P, Rd No 7, Devendra Nagar, Gajularamaram, Hyderabad - 500055, Telangana.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
