import { create } from 'zustand';

interface PreviewStore {
  audioUrl: string | null;
  playerRef: React.RefObject<HTMLAudioElement> | null;
  isPlayable: boolean;
  songId: string | null;
  setAudio: (url: string, id: string) => void;
  setAudioAndPlay: (url: string, id: string) => void;
  setRef: (ref: React.RefObject<HTMLAudioElement>) => void;
  reset: () => void;
}

const usePreview = create<PreviewStore>(set => ({
  audioUrl: null,
  playerRef: null,
  isPlayable: false,
  songId: null,
  setAudio: (url: string, id: string) =>
    set({ audioUrl: url, songId: id, isPlayable: false }),
  setAudioAndPlay: (url: string, id: string) =>
    set({ audioUrl: url, songId: id, isPlayable: true }),
  setRef: (ref: React.RefObject<HTMLAudioElement>) => set({ playerRef: ref }),
  reset: () =>
    set({ audioUrl: null, playerRef: null, isPlayable: false, songId: null }),
}));

export default usePreview;
