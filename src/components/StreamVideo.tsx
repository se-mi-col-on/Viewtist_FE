import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { updateThumbnail } from '../api';

interface StreamVideoProps {
  src: string;
  streamId: string | undefined;
  isAuthor: boolean;
}

const StreamVideo: React.FC<StreamVideoProps> = ({ src, streamId, isAuthor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    if (!isAuthor) return;
    const captureFrame = async () => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx && streamId) {
          ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          const thumbnailDataUrl = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
          await updateThumbnail(streamId, thumbnailDataUrl);
          console.log('썸네일 업데이트 완료');
        }
      }
    };

    const interval = setInterval(captureFrame, 10000); // 10초마다 프레임 캡처

    return () => clearInterval(interval);
  }, [streamId, isAuthor]);

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <>
      <video ref={videoRef} muted src={src} controls style={videoStyle} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
};

export default StreamVideo;
