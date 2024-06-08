import { DockerContainer } from '@/types/docker';
import { Button, Card, CardFooter, CardHeader, CardTitle } from '@/components';
import { Container, Layers, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DockerodeService } from '@/services';
import { transformDockerContainerStatus } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface DockerCardProps {
  name: string;
  containers: DockerContainer[];
}

export const DockerCard = ({ name, containers }: DockerCardProps) => {
  const queryClient = useQueryClient();
  const startContainerMutation = useMutation({
    mutationFn: DockerodeService.startComposedContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['containers'] });
    },
  });
  const stopContainerMutation = useMutation({
    mutationFn: DockerodeService.stopComposedContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['containers'] });
    },
  });
  const [isRunningComposed, setIsRunningComposed] = useState(false);

  useEffect(() => {
    const containersRunning = containers.filter(
      (container) => container.State === 'running',
    );
    setIsRunningComposed(containersRunning.length === containers.length);
  }, [containers]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Layers
            size="40"
            className={isRunningComposed ? 'text-green-500' : 'text-red-500'}
          />
          <div className="flex flex-col">
            <CardTitle className="mb-2">{name}</CardTitle>
            {containers.map((container) => (
              <Link
                to={`/admin/docker/${container.Id}/logs`}
                className="flex items-center gap-3 mb-1 hover:underline"
                key={container.Id}>
                <Container className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {container.Names[0]}
                </span>
                {container.State === 'running' ? (
                  <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                ) : (
                  <span className="text-sm ml-1.5 text-muted-foreground">
                    {transformDockerContainerStatus(container.Status)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="gap-3">
        {!isRunningComposed ? (
          <Button
            className="gap-1"
            onClick={() => startContainerMutation.mutate(name)}>
            <Play size="18" />
            Запустить
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="gap-1"
            onClick={() => stopContainerMutation.mutate(name)}>
            <Pause size="18" />
            Остановить
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
