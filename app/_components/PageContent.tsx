'use client';

import { FC, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import useSongs from '@/actions/useSongs';
import AudioPlayer from '@/components/AudioPlayer';
import Best10Songs from '@/domain/Best10Songs/Best10Songs';
import usePreview from '@/hooks/usePreview';
import useSearchModal from '@/hooks/useSearchModal';
import { useUser } from '@/hooks/useUser';

const PageContent: FC = () => {
  const user = useUser();
  const mySongs = useSongs(user.user?.id);
  const { setAudio, reset, songId } = usePreview();

  const searchModal = useSearchModal();
  const canRegister = mySongs.length < 10;

  useEffect(() => {
    if (!songId) return;

    if (mySongs.length !== 0 && mySongs[0].song_path) {
      setAudio(mySongs[0].song_path, mySongs[0].id);
      return;
    }

    return () => {
      reset();
    };
  }, [mySongs, setAudio]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='mt-2 mb-7 px-6'>
      {user.user && (
        <>
          <div className='flex justify-between items-center'>
            <div className='flex gap-10'>
              <div className='text-white text-xl font-semibold'>
                Your song list
              </div>
              {canRegister && (
                <>
                  <div>
                    <button
                      type='button'
                      className='
                        bg-blue-500
                        rounded-full
                        p-2
                        hover:bg-blue-600
                        transition
                      '
                      onClick={searchModal.onOpen}
                      disabled={mySongs.length >= 10}
                    >
                      <AiOutlinePlus className='text-white' />
                    </button>
                  </div>
                  <p className='text-center p-1'>
                    {canRegister &&
                      `あと${10 - mySongs.length}曲登録することができます`}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className='mt-8'>
            <AudioPlayer />
          </div>
          <div className='mt-10'>
            <Best10Songs songs={mySongs} />
          </div>
        </>
      )}
    </div>
  );
};

export default PageContent;
