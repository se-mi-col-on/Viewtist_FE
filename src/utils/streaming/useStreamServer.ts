import { useStreamKey } from './useStreamKey';

export const useStreamServer = (): string => {
  const { data: streamKey } = useStreamKey();
  return `https://15.164.226.60:8080/hls/${streamKey}_src.m3u8`;
};
