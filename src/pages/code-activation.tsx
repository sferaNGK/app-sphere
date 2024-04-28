import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CodeForm,
  Typography,
} from '@/components';

export const CodeActivation = () => {
  return (
    <div className="container max-w-7xl flex justify-center items-center flex-col">
      <Card>
        <CardHeader>
          <Typography
            variant="title"
            tag="h1"
            className="text-4xl font-bold mb-5 max-lg:text-center">
            Введите код активации
          </Typography>
          <CardDescription className="max-lg:text-center">
            Введите код с вашего мобильного телефона
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <CodeForm />
        </CardContent>
      </Card>
    </div>
  );
};
