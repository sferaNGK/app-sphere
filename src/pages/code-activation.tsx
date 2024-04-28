import { CodeForm, Typography } from '@/components';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card.tsx';

export default function CodeActivation() {
  return (
    <div className="container max-w-7xl flex justify-center items-center flex-col">
      <Card>
        <CardHeader>
          <Typography
            variant="title"
            tag="h1"
            className="text-4xl font-bold mb-5">
            Введите код активации
          </Typography>
          <CardDescription>
            <Typography variant="paragraph16_regular" tag="span">
              Введите код с вашего мобильного телефона
            </Typography>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <CodeForm />
        </CardContent>
      </Card>
    </div>
  );
}
