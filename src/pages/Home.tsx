import { Typography } from '@/components';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/components/ui/card.tsx';

export default function Home() {
  return (
    <div className="container max-w-7xl flex justify-center items-center flex-col">
      <Typography variant="title" tag="h1" className="mb-2 text-4xl font-bold">
        Что ж, сыграем вместе?
      </Typography>
      <Card className="w-full max-w-sm p-2 mt-10">
        <CardHeader>
          <Typography
            variant="title"
            tag="h2"
            className="text-xl font-semibold">
            Регистрация команды
          </Typography>
          <CardDescription>
            Пожалуйста, введите свой email и нажмите кнопку "дАРОВА".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="mt-1"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Давайте!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
