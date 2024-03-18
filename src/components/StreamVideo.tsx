import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface StreamVideoProps {
  src: string;
  type: 'm3u8' | 'mp4' | 'other';
}

const StreamVideo: React.FC<StreamVideoProps> = ({ src, type }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: any;
    if (type === 'm3u8' && Hls.isSupported()) {
      console.log('m3u8 지원 확인');
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current as HTMLVideoElement);
      // hls.on(Hls.Events.MANIFEST_PARSED, function () {
      //   videoRef.current?.play();
      // });
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
      // videoRef.current.addEventListener('loadedmetadata', function () {
      //   videoRef.current?.play();
      // });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, type]);

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return <video ref={videoRef} src={src} controls style={videoStyle} />;
};

export default StreamVideo;
