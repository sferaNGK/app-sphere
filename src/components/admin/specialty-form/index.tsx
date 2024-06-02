import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import React from 'react';
import { Specialty } from '@/types';

const FormSchema = z.object({
  specialty_id: z.string({
    required_error: 'Пожалуйста, выберете специальность.',
  }),
});

interface SpecialtyFormProps {
  onStart: (id: number) => void;
  children: React.ReactNode;
  specialties: Specialty[];
}

export function SpecialtyForm({
  children,
  specialties,
  onStart,
}: SpecialtyFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onStart(+data.specialty_id);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="specialty_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cпециальности</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите специальность, по которым запустятся игры." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialties.length &&
                    specialties.map((specialty) => (
                      <SelectItem
                        key={specialty.id}
                        value={String(specialty.id)}>
                        {specialty.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Выберите специальность, по которым запустятся игры.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
}
