import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface StreamVideoProps {
  src: string;
  type: 'm3u8' | 'mp4' | 'other';
}

const StreamVideo: React.FC<StreamVideoProps> = ({ src, type }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type === 'm3u8' && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current as HTMLVideoElement);
    }
  }, [src, type]);

  return <video ref={videoRef} src={src} controls />;
};

export default StreamVideo;
