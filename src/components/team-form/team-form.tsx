'use client';

import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSocket } from '@/stores/socket.ts';

const FormSchema = z.object({
  teamName: z.string().min(2, {
    message: 'Название команды должно быть от 2-х символов.',
  }),
});

export const TeamForm = () => {
  const [socket] = useSocket((state) => [state.socket]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teamName: '',
    },
  });

  const registerTeam = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      socket?.emit('user:registerTeam', { teamName: data.teamName });
    },
    [socket],
  );

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    registerTeam(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 grid">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название команды</FormLabel>
              <FormControl>
                <Input placeholder="Название команды" {...field} />
              </FormControl>
              <FormDescription>
                Здесь отображается название вашей команды
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Давайте!</Button>
      </form>
    </Form>
  );
};
