import { useStreamKey } from './useStreamKey';

export const useStreamServer = () => {
  const { data: streamKey } = useStreamKey();
  return `http://15.164.226.60:8080/hls/${streamKey}_src.m3u8`;
};
