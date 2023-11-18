'use client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import { FC } from 'react';
import PlayButton from './PlayButton';

interface SongItemProps {
  title: string;
  onClick: () => void;
  author?: string;
  imagePath?: string;
}

const SongItem: FC<SongItemProps> = ({ title, author, imagePath, onClick }) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      className='
        relative
        group
        flex
        flex-col
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3
      '
    >
      <div
        className='
          relative
          aspect-square
          w-full
          h-full
          rounded-md
          overflow-hidden
        '
      >
        <Image
          className='object-cover'
          src={imagePath || '/images/liked.png'}
          fill
          alt='Image'
        />
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='font-semibold truncate w-full'>{title}</p>
        <p
          className='
            text-neutral-400
            text-sm
            pb-4
            w-full
            truncate
        '
        >
          {author}
        </p>
        <div
          className='
          absolute
          bottom-24
          right-5
        '
        >
          <PlayButton />
        </div>
      </div>
    </div>
  );
};

export default SongItem;
