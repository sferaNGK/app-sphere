import { useEffect, useState } from 'react';
import { DockerodeResponse } from '@/types/docker';

type UseFilteredData = (
  data: DockerodeResponse[] | undefined,
  filterOption: string,
) => DockerodeResponse[] | undefined;

export const useFilteredData: UseFilteredData = (data, filterOption) => {
  const [filteredData, setFilteredData] = useState(data);

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

  return filteredData;
};
