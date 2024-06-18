import { AsideLink, Button } from '@/components';
import { Brain, Container, Gamepad2, Target } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const AsidePanel = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const links = [
    {
      id: 1,
      pathname: '/admin/dashboard',
      content: 'Сессии и запуск игр',
      navigate: () => navigate('/admin/dashboard'),
      children: <Gamepad2 />,
    },
    {
      id: 2,
      pathname: '/admin/docker',
      content: 'Контейнеры Docker (игры)',
      navigate: () => navigate('/admin/docker'),
      children: <Container />,
    },
    {
      id: 3,
      content: 'Очереди',
      children: (
        <Link
          className="w-full h-full flex items-center justify-center"
          to={`${import.meta.env.VITE_API_URL}/bull-board`}
          target="_blank">
          <Target />
        </Link>
      ),
    },
  ];

  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon">
          <Brain />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {links.map((link) => (
          <AsideLink
            key={link.id}
            currentPath={pathname}
            pathname={link?.pathname}
            onClick={() => (link.navigate ? link.navigate() : null)}
            content={link.content}
            children={link.children}
          />
        ))}
      </nav>
    </aside>
  );
};
