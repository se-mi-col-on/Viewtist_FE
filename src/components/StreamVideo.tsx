import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface StreamVideoProps {
  src: string;
}

const StreamVideo: React.FC<StreamVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: any;
    if (Hls.isSupported()) {
      console.log('m3u8 지원 확인');
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
      videoRef.current.addEventListener('loadedmetadata', function () {
        videoRef.current.play();
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return <video ref={videoRef} src={src} controls style={videoStyle} />;
};

export default StreamVideo;
