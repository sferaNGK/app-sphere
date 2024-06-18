import { Button } from '@/components';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">Дашборд</h1>
      <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
        <Link to="https://github.com/M4cr0s3">Developed By @M4cr0s3</Link>
      </Button>
    </header>
  );
};
