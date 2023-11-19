'use client';

import usePreview from '@/hooks/usePreview';
import Image from 'next/image';
import React, { FC } from 'react';
import { FaPlay } from 'react-icons/fa';
import PlayButton from './PlayButton';

interface ListItemProps {
  songId: string;
  title: string;
  imagePath: string;
  onClick: () => void;
  audioUrl?: string;
  author?: string;
}

const ListItem: FC<ListItemProps> = ({
  songId,
  title,
  imagePath,
  onClick,
  author,
  audioUrl,
}) => {
  const { setAudioAndPlay } = usePreview();

  const onPlay = (event: React.BaseSyntheticEvent) => {
    // 曲の入れ替え処理が発火しないように止める
    event.stopPropagation();

    if (!audioUrl) return;
    setAudioAndPlay(audioUrl ?? '', songId);
  };

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
        max-w-[500px]
      '
    >
      <div
        className='
        relative
        min-h-[64px]
        min-w-[64px]
      '
      >
        <Image className='object-cover' fill src={imagePath} alt='image' />
      </div>
      <div className='flex flex-col items-start gap-y-1 text-white'>
        <p className='font-semibold truncate'>{title}</p>
        <p
          className='
            text-neutral-400
            text-sm
        '
        >
          {author}
        </p>
      </div>
      <div
        className='
          absolute
          right-10
        '
      >
        <PlayButton onClick={e => onPlay(e)} />
      </div>
    </button>
  );
};

export default ListItem;
