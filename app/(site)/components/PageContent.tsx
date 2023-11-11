"use client"

import { Song } from '@/types';
import { FC } from 'react';

import SongItem from '@/components/SongItem';
import { AiOutlinePlus } from 'react-icons/ai';

import useSearchModal from '@/hooks/useSearchModal';
import SearchItem from '@/components/SearchItem';


interface PageContentProps {
  songs: Song[]
};

const PageContent: FC<PageContentProps> = ({
  songs,
}) => {
  const searchModal = useSearchModal();

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
            >
              <AiOutlinePlus className='text-white' />
            </button>
          </div>
        </div>
      </div>
        <div>
          <div
          className='
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8gap-4
            mt-4
          '
        >
          {songs.map((item) => (
            <SearchItem
              key={item.id}
              onClick={() => {}}
              name={item.title}
              author={item.author}
              image={item.image_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageContent;  