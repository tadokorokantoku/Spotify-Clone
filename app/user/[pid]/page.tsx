'use client';
import useSongs from '@/actions/useSongs';
import { useTargetUser } from '@/actions/useTargetUser';
import AudioPlayer from '@/components/AudioPlayer';
import Best10Songs from '@/domain/Best10Songs/Best10Songs';
import Header from '@/domain/Header/Header';
import useLoadImage from '@/hooks/useLoadImage';
import usePreview from '@/hooks/usePreview';
import { Avatar } from '@mantine/core';
import { useEffect } from 'react';

export default function OtherUser({ params }: { params: { pid: string } }) {
  const user = useTargetUser(params.pid);
  const songs = useSongs(params.pid);
  const image = useLoadImage(user?.avatar_url ?? '');
  const { setAudio, reset } = usePreview();

  useEffect(() => {
    if (songs.length !== 0 && songs[0].song_path) {
      setAudio(songs[0].song_path, songs[0].id);
      return;
    }

    return () => {
      reset();
    };
  }, [songs, setAudio]);

  if (!user) return null;

  return (
    <div
      className='
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    '
    >
      <Header className='mb-2'>
        <div className='flex gap-10'>
          <Avatar size='xl' radius='md' src={image} alt='target user' />
          <h1
            className='
            flex
            text-white
            text-5xl
            font-semibold
            items-center
          '
          >
            {user.full_name ?? 'No name'}
          </h1>
        </div>
      </Header>
      <div className='ml-8'>
        <AudioPlayer />
      </div>
      <div className='p-8'>
        <Best10Songs songs={songs} forMe={false} />
      </div>
    </div>
  );
}
