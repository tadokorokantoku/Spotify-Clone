import { create } from 'zustand';

interface PreviewStore {
  audioUrl: string | null;
  playerRef: React.RefObject<HTMLAudioElement> | null;
  isPlayable: boolean;
  setAudio: (url: string) => void;
  setAudioAndPlay: (url: string) => void;
  setRef: (ref: React.RefObject<HTMLAudioElement>) => void;
}

const usePreview = create<PreviewStore>(set => ({
  audioUrl: '',
  playerRef: null,
  isPlayable: false,
  setAudio: (url: string) => set({ audioUrl: url, isPlayable: false }),
  setAudioAndPlay: (url: string) => set({ audioUrl: url, isPlayable: true }),
  setRef: (ref: React.RefObject<HTMLAudioElement>) => set({ playerRef: ref }),
}));

export default usePreview;
