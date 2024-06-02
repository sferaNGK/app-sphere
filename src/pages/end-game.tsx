import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LegendElement,
  LinearScale,
  Title,
  Tooltip,
  TooltipLabelStyle,
} from 'chart.js';
import { Button, Container } from '@/components';

type CustomLegend = LegendElement<'bar'> & { fit?: () => void };

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Итоги',
      font: {
        size: 30,
        family:
          'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        weight: 700,
      },
      color: 'rgb(0,0,0)',
    },
    legend: {
      display: true,
      labels: {
        font: {
          size: 17,
          family:
            'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          weight: 400,
        },
        title: {
          display: true,
          padding: 10,
        },
        useBorderRadius: true,
        borderRadius: 3,
        color: 'rgba(0,0,0, .8)',
      },
    },
    tooltip: {
      bodyFont: {
        size: 16,
        family:
          'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        weight: 400,
        padding: {
          left: 10,
        },
      },
      titleFont: {
        size: 16,
        family:
          'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        weight: 700,
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 15,
        right: 15,
      },
      boxPadding: 4,
      callbacks: {
        labelColor: function (): TooltipLabelStyle {
          return {
            backgroundColor: 'rgba(0,0,0, .23)',
            borderColor: 'rgba(0,0,0, .6)',
            borderRadius: 3,
            borderWidth: 1,
          };
        },
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 14,
          family:
            'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 14,
          family:
            'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
      },
    },
  },
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 2,
      borderRadius: 100, // Изменяем высоту баров для мобильных устройств
      barPercentage: 10, // Изменяем ширину баров для мобильных устройств
    },
  },
};

export const EndGame = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { users } = state as { users: User[] };

  // const users2 = [
  //   {
  //     teamName: 'Team 1',
  //     points: 10,
  //   },
  //   {
  //     teamName: 'Team 2',
  //     points: 20,
  //   },
  //   {
  //     teamName: 'Team 3',
  //     points: 30,
  //   },
  //   {
  //     teamName: 'Team 4',
  //     points: 40,
  //   },
  //   {
  //     teamName: 'Team 5',
  //     points: 50,
  //   },
  // ];

  const data = {
    labels: users.map((user) => user.teamName),
    datasets: [
      {
        label: 'Очки',
        data: users.map((user) => user.points),
        backgroundColor: 'rgba(0,0,0, .23)',
        borderColor: 'rgba(0,0,0, .6)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-y-hidden">
      <Container className="max-md:h-[80vh]">
        <Bar
          plugins={[
            {
              id: 'increase-legend-spacing',
              beforeInit(chart) {
                const originalFit = (chart.legend as CustomLegend).fit;
                (chart.legend as CustomLegend).fit = function fit() {
                  if (originalFit) {
                    originalFit.bind(chart.legend)();
                  }
                  this.height += 20;
                };
              },
            },
          ]}
          data={data}
          options={options}
        />
        <div
          className="w-full flex justify-center mt-3"
          onClick={() => {
            localStorage.clear();
            navigate('/');
            location.reload();
          }}>
          <Button>Домой</Button>
        </div>
      </Container>
    </div>
  );
};
