export const transformDockerContainerStatus = (status: string) => {
  const regExp = /Exited \(\d+\)/;
  return status.replace(regExp, '').trim();
};
