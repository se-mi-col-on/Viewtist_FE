import { useStreamKey } from './useStreamKey';

export const useStreamServer = (): string => {
  const { data: streamKey } = useStreamKey();
  // return `https://15.164.226.60:8080/hls/${streamKey}_src.m3u8`;
  return `https://ec2-15-164-226-60.ap-northeast-2.compute.amazonaws.com/hls/${streamKey}_src.m3u8`;
};
