import { useMemo, useState } from 'react';
import { BriefcaseBusiness, ClipboardList, Home } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { RequestPage } from './pages/RequestPage';
import { WorksPage } from './pages/WorksPage';

export type Page = 'home' | 'request' | 'works';

const navigation = [
  { id: 'home' as const, label: 'Home', icon: Home },
  { id: 'request' as const, label: 'Request Service', icon: ClipboardList },
  { id: 'works' as const, label: 'Our Works', icon: BriefcaseBusiness },
];

export function App() {
  const [page, setPage] = useState<Page>('home');

  const CurrentPage = useMemo(() => {
    if (page === 'request') return RequestPage;
    if (page === 'works') return WorksPage;
    return HomePage;
  }, [page]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setPage('home')} aria-label="Go to home page">
          <span className="brand-mark">US</span>
          <span>
            <strong>Udumalpet Software Solutions</strong>
            <small>Software, IT and practical technical support</small>
          </span>
        </button>

        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={page === item.id ? 'nav-link active' : 'nav-link'}
                onClick={() => setPage(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <main>
        <CurrentPage onNavigate={setPage} />
      </main>
    </div>
  );
}

