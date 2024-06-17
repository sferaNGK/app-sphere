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

  static async startComposedContainer(projectName: string) {
    return api.post<DockerodeActionRequest, DockerodeActionResponse>(
      `/dockerode/start`,
      {
        projectName,
      },
    );
  }

  static async stopComposedContainer(projectName: string) {
    return api.post<DockerodeActionRequest, DockerodeActionResponse>(
      `/dockerode/stop`,
      {
        projectName,
      },
    );
  }
}

export { DockerodeService };
