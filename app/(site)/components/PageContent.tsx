"use client"

import { Song } from '@/types';
import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import useSearchModal from '@/hooks/useSearchModal';
import Best10Songs from '@/domain/Best10Songs/Best10Songs';


interface PageContentProps {
  songs: Song[]
};

const PageContent: FC<PageContentProps> = ({
  songs,
}) => {
  const searchModal = useSearchModal();
  const canRegister = songs.length < 10 

  if (songs.length === 0)  {
    return (
      <div className='mt-4 text-neutral-400'>
        No songs available.
      </div>
    )
  }
  return (
    <div className='mt-2 mb-7 px-6'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-10'>
          <div className='text-white text-2xl font-semibold'>
            Your 10 songs
          </div>
          {canRegister && (
            <>
              <div>
                <button
                  className='
                    bg-blue-500
                    rounded-full
                    p-2
                    hover:bg-blue-600
                    transition
                  '
                  onClick={searchModal.onOpen}
                  disabled={songs.length >= 10}
                >
                  <AiOutlinePlus className='text-white' />
                </button>
              </div>
              <p className='text-center p-1'>
                { canRegister && `あと${10 - songs.length}曲登録することができます`}
              </p>
            </>
          )}
        </div>
      </div>
      <div className='mt-10'>
        <Best10Songs songs={songs} />
      </div>
    </div>
  );
};

export default PageContent;  