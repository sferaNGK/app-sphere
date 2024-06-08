import { api } from '@/api';
import {
  DockerodeActionRequest,
  DockerodeActionResponse,
  DockerodeResponse,
} from '@/types/docker';

class DockerodeService {
  static async getComposedContainers() {
    return (await api.get<DockerodeResponse[]>('/dockerode')).data;
  }

  static async startComposedContainer(imageName: string) {
    return api.post<DockerodeActionRequest, DockerodeActionResponse>(
      `/dockerode/start`,
      {
        imageName,
      },
    );
  }

  static async stopComposedContainer(imageName: string) {
    return api.post<DockerodeActionRequest, DockerodeActionResponse>(
      `/dockerode/stop`,
      {
        imageName,
      },
    );
  }
}

export { DockerodeService };
