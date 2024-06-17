export interface Port {
  IP: string;
  PrivatePort: number;
  PublicPort: number;
  Type: string;
}

export interface Labels {
  'com.docker.compose.config-hash': string;
  'com.docker.compose.container-number': string;
  'com.docker.compose.depends_on': string;
  'com.docker.compose.image': string;
  'com.docker.compose.oneoff': string;
  'com.docker.compose.project': string;
  'com.docker.compose.project.config_files': string;
  'com.docker.compose.project.working_dir': string;
  'com.docker.compose.replace': string;
  'com.docker.compose.service': string;
  'com.docker.compose.version': string;
  'desktop.docker.io/binds/0/Source': string;
  'desktop.docker.io/binds/0/SourceKind': string;
  'desktop.docker.io/binds/0/Target': string;
  'desktop.docker.io/wsl-distro': string;
}

export interface Network {
  IPAMConfig: string;
  Links: string;
  Aliases: string;
  MacAddress: string;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  DriverOpts: string;
}

export interface NetworkSettings {
  Networks: {
    [key: string]: Network;
  };
}

export interface Mount {
  Type: string;
  Source: string;
  Destination: string;
  Mode: string;
  RW: boolean;
  Propagation: string;
}

export interface DockerContainer {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: Port[];
  Labels: Labels;
  State: string;
  Status: string;
  HostConfig: {
    NetworkMode: string;
  };
  NetworkSettings: NetworkSettings;
  Mounts: Mount[];
}

export interface DockerodeResponse {
  name: string;
  containers: DockerContainer[];
}

export interface DockerodeActionRequest {
  projectName: string;
}

export interface DockerodeActionResponse {
  success: boolean;
  message: string;
}
