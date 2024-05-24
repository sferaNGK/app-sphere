'use client';

import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from '@/components';
import { useSocket } from '@/stores';
import { clsx } from 'clsx';

interface SessionFormProps {
  error?: string;
  setError?: (error: string) => void;
  className?: string;
}

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Название игровой сессии должно быть от 2-х символов.',
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export const SessionForm = ({
  error,
  setError,
  className,
}: SessionFormProps) => {
  const [socket] = useSocket((state) => [state.socket]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
    },
  });

  const registerTeam = useCallback(
    (data: FormValues) => {
      socket?.emit('game:createGameSession', {
        title: data.title,
        isAdmin: true,
      });
    },
    [socket],
  );

  const onSubmit = (data: FormValues) => {
    registerTeam(data);
    form.control._reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx(className, 'space-y-6 grid')}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {error ? (
                  <span className="text-destructive">
                    Название игровой сессии
                  </span>
                ) : (
                  'Название игровой сессии'
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Название игровой сессии"
                  {...field}
                  onFocus={() => setError && setError('')}
                />
              </FormControl>
              <FormMessage />
              {error && (
                <div className="text-[0.8rem] font-medium text-destructive">
                  {error}
                </div>
              )}
            </FormItem>
          )}
        />
        <Button type="submit">Создать игровую сессию</Button>
      </form>
    </Form>
  );
};
