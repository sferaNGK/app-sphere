import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Container,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Typography,
} from '@/components';
import { useBoard, useCode } from '@/stores';

export const Code = () => {
  const code = useCode((state) => state.code);
  const board = useBoard((state) => state.board);

  return (
    <Container className="flex justify-center items-center flex-col">
      <Card>
        <CardHeader>
          <Typography
            variant="title"
            tag="h1"
            className="text-4xl font-bold max-lg:text-center">
            Ваш код
          </Typography>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="flex flex-col space-y-3">
            <Badge variant="outline" className="flex justify-center">
              КОД
            </Badge>
            <InputOTP maxLength={6} value={code ? code : ''}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Badge
              variant="outline"
              className="flex flex-col justify-center p-3">
              Подойдите к доске
              <span className="font-bold">{`Номер ${board?.place}`}</span>
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};
