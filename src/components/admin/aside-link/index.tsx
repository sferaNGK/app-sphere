import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';
import { clsx } from 'clsx';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface AsideLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentPath: string;
  pathname?: string;
  content: string;
  children?: ReactNode;
}

export const AsideLink = ({
  currentPath,
  pathname,
  content,
  children,
  ...props
}: AsideLinkProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            {...props}
            variant="ghost"
            size="icon"
            className={clsx('rounded-lg', {
              'bg-muted': pathname === currentPath,
            })}
            aria-label={content}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
