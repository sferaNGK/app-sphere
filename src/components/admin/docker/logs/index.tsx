import { useSocket } from '@/stores';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components';

export const DockerLogs = () => {
  const socket = useSocket((state) => state.socket);
  const { containerId } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState('');
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  const scrollToBottom = () => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop =
        logsContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit('docker:streamLogs', { containerId });

      const handleLogs = (data: string) => {
        setLogs((prev) => prev + data);
      };

      socket.on('docker:streamLogs', handleLogs);

      return () => {
        socket.off('docker:streamLogs', handleLogs);
      };
    }
  }, [containerId]);

  useEffect(() => {
    setLogs('');
  }, [containerId]);

  useEffect(() => {
    const handleScroll = () => {
      if (logsContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          logsContainerRef.current;
        setShowButton(scrollHeight - scrollTop - clientHeight > 300);
      }
    };

    if (logsContainerRef.current) {
      logsContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (logsContainerRef.current) {
        logsContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [logsContainerRef]);

  return (
    <div className="container mx-auto p-4 w-[500px]">
      <div
        className="bg-foreground text-white rounded-lg shadow-md p-5 h-[50rem] overflow-y-auto relative"
        ref={logsContainerRef}>
        <pre className="whitespace-pre-wrap">{logs}</pre>
        <div className="sticky bottom-0 right-0 flex justify-end gap-4">
          <Button variant="secondary" onClick={() => navigate('/admin/docker')}>
            Закрыть
          </Button>
          {showButton && (
            <div className="sticky bottom-0 right-0 flex justify-end">
              <Button variant="secondary" onClick={scrollToBottom}>
                Прокрутить вниз
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
