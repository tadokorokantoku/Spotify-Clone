import { FC } from 'react';
import { Song } from '@/types';
import SearchItem from '@/domain/SearchModal/SearchItem';
import ListItem from '@/components/ListItem';

interface Best10SongsProps {
  songs: Song[];
};

const Best10Songs: FC<Best10SongsProps> = ({ songs }) => {
  return (
    <div>
      <div
      className='
        grid
        grid-cols-2
        mt-4
        gap-y-4
      '
      >
        {songs.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => {}}
            title={item.title}
            author={item.author}
            imagePath={item.image_path}
          />
        ))}
      </div>
    </div>
  );
};

export default Best10Songs;