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
      console.log('m3u8 지원 확인');
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current as HTMLVideoElement);
    }
  }, [src, type]);

  const videoStyle = {
    width: '100%',
    height: '100%',
  };

  return <video ref={videoRef} src={src} controls style={videoStyle} />;
};

export default StreamVideo;
