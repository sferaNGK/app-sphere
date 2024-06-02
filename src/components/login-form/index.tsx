import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email не должен быть пустым.' })
    .email({ message: 'Невалидный email.' }),
  password: z
    .string()
    .min(1, { message: 'Пароль не должен быть пустым.' })
    .min(6, { message: 'Пароль должен содержать не менее 6 символов.' }),
});

type FormValues = z.infer<typeof FormSchema>;

export const LoginForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Введите Ваш Email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="Пароль" {...field} type="password" />
              </FormControl>
              <FormDescription>
                Введите Ваш пароль для авторизации.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Войти</Button>
      </form>
    </Form>
  );
};
