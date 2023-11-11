"use client"

import React, { FC } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { FaPlay} from 'react-icons/fa'

interface ListItemProps {
  title: string;
  imagePath: string;
  onClick: () => void;
  author?: string;
};

const ListItem: FC<ListItemProps> = ({
  title,
  imagePath,
  onClick,
  author
}) => {
  const router = useRouter();

  return (
    <button
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
        max-w-[500px]
      '
    >
      <div className="
        relative
        min-h-[64px]
        min-w-[64px]
      "
      >
        <Image
          className='object-cover'
          fill
          src={imagePath}
          alt="image"
        />
      </div>
      <div className="flex flex-col items-start gap-y-1" >
        <p className='font-semibold truncate' >
          {title}
        </p>
        <p 
          className='
            text-neutral-400
            text-sm
        '>
          {author}
        </p>
      </div>
      <div
        className='
          absolute
          transition
          opacity-0
          rounded-full
          flex
          items-center
          justify-center
          bg-green-500
          p-4
          drop-shadow-md
          right-5
          group-hover:opacity-100
          hover:scale-110
        '
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;