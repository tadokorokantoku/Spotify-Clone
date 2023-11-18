'use client';

import { Song } from '@/types';
import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import Best10Songs from '@/domain/Best10Songs/Best10Songs';
import useSearchModal from '@/hooks/useSearchModal';
import { useUser } from '@/hooks/useUser';

interface PageContentProps {
  songs: Song[];
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
  const user = useUser();
  const mySongs = songs.filter(song => song.user_id === user.user?.id);
  const searchModal = useSearchModal();
  const canRegister = mySongs.length < 10;

  return (
    <div className='mt-2 mb-7 px-6'>
      {user.user && (
        <>
          <div className='flex justify-between items-center'>
            <div className='flex gap-10'>
              <div className='text-white text-2xl font-semibold'>
                Your 10 songs
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

          <div className='mt-10'>
            <Best10Songs songs={mySongs} />
          </div>
        </>
      )}
    </div>
  );
};

export default PageContent;
