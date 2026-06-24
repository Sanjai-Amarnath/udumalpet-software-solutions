import { ArrowRight, CheckCircle2, Cpu, Database, Globe2, MessageSquareText, Smartphone } from 'lucide-react';
import type { Page } from '../App';

type Props = {
  onNavigate: (page: Page) => void;
};

const services = [
  { icon: Cpu, title: 'Custom Software', text: 'Internal tools, billing systems, dashboards, automation and workflow apps.' },
  { icon: Globe2, title: 'Websites', text: 'Fast business websites, portals, landing pages and service request systems.' },
  { icon: Smartphone, title: 'Mobile Apps', text: 'Android-focused app planning and development for real customer workflows.' },
  { icon: Database, title: 'Backend Systems', text: 'APIs, databases, admin panels, integrations and hosted services.' },
  { icon: MessageSquareText, title: 'Consultation', text: 'Clear technical guidance before you commit money to a project.' },
  { icon: CheckCircle2, title: 'PC Diagnostics', text: 'Troubleshooting help for boot issues, errors, slow systems and hardware doubts.' },
];

export function HomePage({ onNavigate }: Props) {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay">
          <p className="eyebrow">Udumalpet Software Solutions</p>
          <h1>Tell us the problem. We will shape the software or IT solution.</h1>
          <p className="hero-copy">
            We help small businesses, teams, institutions and individuals understand whether their idea can be
            built, improved, repaired or supported with the right technology.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => onNavigate('request')}>
              Start a request <ArrowRight size={18} />
            </button>
            <button className="secondary-action" onClick={() => onNavigate('works')}>
              View our works
            </button>
          </div>
        </div>
      </section>

      <section className="section intro-band">
        <div>
          <span className="section-kicker">What we do</span>
          <h2>Software and IT help that begins with your exact need.</h2>
        </div>
        <p>
          Use the request form to share the requirement, budget, timeline, screenshots, device details or reference
          apps. We review it and respond with the next practical step.
        </p>
      </section>

      <section className="service-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article className="service-card" key={service.title}>
              <Icon size={28} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          );
        })}
      </section>
    </>
  );
}

