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
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const Docker = () => {
  const [filterOption, setFilterOption] = useState('');
  const { data } = useQuery({
    queryKey: ['containers'],
    queryFn: DockerodeService.getComposedContainers,
    refetchInterval: 3000,
  });
  const [filteredData, setFilteredData] = useState<typeof data>(data);

  useEffect(() => {
    const sortedData = [...(data || [])].sort((a, b) => {
      if (
        a[filterOption as keyof typeof a] &&
        b[filterOption as keyof typeof b]
      ) {
        return (a[filterOption as keyof typeof a] as string).localeCompare(
          b[filterOption as keyof typeof b] as string,
        );
      } else if (filterOption === 'nameZtoA') {
        return (b.name as string).localeCompare(a.name as string);
      }

      return 0;
    });
    setFilteredData(sortedData);
  }, [filterOption, data]);

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
