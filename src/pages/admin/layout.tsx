import { Header, AsidePanel } from '@/components';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="grid h-screen w-full pl-[53px]">
        <AsidePanel />
        <div className="flex flex-col">
          <Header />
          <main className="md:grid max-md:flex max-md:flex-col flex-1 gap-8 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
