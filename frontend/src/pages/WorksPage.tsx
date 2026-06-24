import { ExternalLink, MonitorCog, PanelsTopLeft, ServerCog } from 'lucide-react';

const works = [
  {
    title: 'Business Website Package',
    category: 'Website Development',
    description: 'Responsive company website with enquiry flow, service sections and hosting-ready build output.',
    icon: PanelsTopLeft,
    status: 'Ready to customize',
  },
  {
    title: 'Service Request Portal',
    category: 'Custom Software',
    description: 'Structured intake forms, project requirement capture and admin-friendly request records.',
    icon: ServerCog,
    status: 'In active development',
  },
  {
    title: 'PC Troubleshooting Intake',
    category: 'Diagnostics',
    description: 'Device issue collection flow with boot status, error screenshots and hardware information.',
    icon: MonitorCog,
    status: 'Available workflow',
  },
];

export function WorksPage() {
  return (
    <section className="page-wrap">
      <div className="page-heading">
        <span className="section-kicker">Works we have done</span>
        <h1>Practical projects, ready to grow with real client details.</h1>
        <p>
          This page is prepared for your portfolio. Replace or extend these entries with finished client work,
          screenshots, links and case study details as projects are completed.
        </p>
      </div>

      <div className="works-grid">
        {works.map((work) => {
          const Icon = work.icon;
          return (
            <article className="work-card" key={work.title}>
              <div className="work-icon">
                <Icon size={28} />
              </div>
              <span>{work.category}</span>
              <h2>{work.title}</h2>
              <p>{work.description}</p>
              <footer>
                <strong>{work.status}</strong>
                <ExternalLink size={17} />
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}

