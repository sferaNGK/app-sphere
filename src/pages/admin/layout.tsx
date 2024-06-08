import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';
import { Brain, Container, Gamepad2, Target } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

export const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="grid h-screen w-full pl-[53px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon">
              <Brain />
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => navigate('/admin/dashboard')}
                    variant="ghost"
                    size="icon"
                    className={clsx('rounded-lg', {
                      'bg-muted': pathname === '/admin/dashboard',
                    })}
                    aria-label="Playground">
                    <Gamepad2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Сессии и запуск игр
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => navigate('/admin/docker')}
                    variant="ghost"
                    size="icon"
                    className={clsx('rounded-lg', {
                      'bg-muted': pathname === '/admin/docker',
                    })}
                    aria-label="Контейнеры Docker">
                    <Container />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Контейнеры Docker (игры)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Очередь">
                    <Link
                      className="w-full h-full flex items-center justify-center"
                      to={`${import.meta.env.VITE_API_URL}/bull-board`}
                      target="_blank">
                      <Target />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Очереди
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto grid gap-1 p-2"></nav>
        </aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Дашборд</h1>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm">
              <a href="https://github.com/M4cr0s3">Developed By @M4cr0s3</a>
            </Button>
          </header>
          <main className="md:grid max-md:flex max-md:flex-col flex-1 gap-8 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
