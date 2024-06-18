import { DockerodeService } from '@/services';
import { DockerCard } from '@/components/admin/docker/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useFilteredData } from '@/hooks';

export const Docker = () => {
  const [filterOption, setFilterOption] = useState('');
  const { data } = useQuery({
    queryKey: ['containers'],
    queryFn: DockerodeService.getComposedContainers,
    refetchInterval: 3000,
  });
  const filteredData = useFilteredData(data, filterOption);

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Typography
            variant="title"
            tag="h1"
            className="font-bold text-3xl mb-2">
            Docker контейнеры
          </Typography>
          <div className="w-64">
            <Select onValueChange={(value: string) => setFilterOption(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите опцию для сортировки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">По названию (А-Я)</SelectItem>
                <SelectItem value="nameZtoA">По названию (Я-А)</SelectItem>
                <SelectItem value="''">Без сортировки</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {filteredData &&
          filteredData.map((container) => (
            <DockerCard
              key={container.name}
              name={container.name}
              containers={container.containers}
            />
          ))}
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
