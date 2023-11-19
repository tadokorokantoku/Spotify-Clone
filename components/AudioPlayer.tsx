import usePreview from '@/hooks/usePreview';
import { useEffect, useRef } from 'react';

const AudioPlayer: React.FC = () => {
  const { audioUrl, setRef, isPlayable, reset } = usePreview();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioUrl) {
      return;
    }
    audioRef.current?.load();

    if (isPlayable && audioRef.current) {
      audioRef.current?.play();
    }
  }, [audioUrl, isPlayable, reset]);

  useEffect(() => {
    setRef(audioRef);
  }, [setRef]);

  return (
    <div>
      <audio controls ref={audioRef}>
        <track kind='captions' />
        <source src={audioUrl ?? ''} type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
