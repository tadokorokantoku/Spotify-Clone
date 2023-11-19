'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface SearchItemProps {
  image: string;
  name: string;
  author: string;
  onClick: () => void;
}

const SearchItem: FC<SearchItemProps> = ({ image, name, author, onClick }) => {
  const router = useRouter();

  return (
    <button
      type='button'
      onClick={onClick}
      className='
        relative
        group
        flex
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-100/10
        hover:bg-neutral-100/20
        transition
        pr-4
        w-full
      '
    >
      <div
        className='
        relative
        min-h-[64px]
        min-w-[64px]
      '
      >
        <Image
          className='object-cover'
          height={64}
          width={64}
          // fill
          src={image}
          alt='image'
        />
      </div>
      <div className='flex flex-col items-start gap-y-1'>
        <p className='font-semibold truncate'>{name}</p>
        <p
          className='
            text-neutral-400
            text-sm
        '
        >
          {author}
        </p>
      </div>
    </button>
  );
};

export default SearchItem;
