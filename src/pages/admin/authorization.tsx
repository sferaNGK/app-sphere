import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
} from '@/components';
import { LoginForm } from '@/components';

export const Authorization = () => {
  return (
    <Container className="flex justify-center items-center flex-col">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Авторизация</CardTitle>
          <CardDescription>
            Введите Ваш Email и пароль для авторизации.
          </CardDescription>
          <CardContent className="p-0">
            <LoginForm />
          </CardContent>
        </CardHeader>
      </Card>
    </Container>
  );
};
