export const createStreamServer = (streamKey: string | undefined): string => {
  // return `https://15.164.226.60:8080/hls/${streamKey}_src.m3u8`;
  return `https://ec2-15-164-226-60.ap-northeast-2.compute.amazonaws.com/hls/${streamKey}_src.m3u8`;
};
