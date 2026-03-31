import { Outlet } from 'react-router-dom';
import SimpleHeader from '../../components/SimpleHeader';
import Footer from '../../components/Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] flex flex-col">
      <SimpleHeader />
      <main className="flex-1 pt-[56px] md:pt-[60px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

