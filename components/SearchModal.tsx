import { ChangeEvent, FC, useState } from 'react';
import Modal from './Modal';

import { searchSongs } from '@/hooks/useSearchSongs';
import Input from '@/components/Input';
import SearchItem from '@/components/SearchItem';

type artist = {
  name: string,
  id: string,
  type: string,
  uri: string,
}

type album = {
  artists: artist[],
  name: string,
  id: string,
  type: string,
  uri: string,
  images: image[];
  release_date: string,
  total_tracks: number,
}

type image = {
  height: number,
  url: string,
  width: number,
}

interface fetchedSongs {
  id: number;
  name: string;
  artists: artist[];
  album: album;
  year: number;
  genre: string;
  duration: number;
  
  file: string;

}

interface SearchModalProps {};

const SearchModal: FC<SearchModalProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<fetchedSongs[]>([]);
  const [isOpened, setIsOpened] = useState(true);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    const query = value
    searchSongs(query).then((songs) => {
      setSongs(songs);
    }).catch((e) => {
      console.log(e);
    });
  }

  return (
    <Modal
      title='Search'
      description='' 
      isOpen={isOpened}
      onChange={() => {}}
      onClose={() => setIsOpened(false)}
    >
      <div>
        <div className="pb-1">
          Enter the name of your favorite song!
        </div>
        <Input
          id="query"
          type="text"
          value={query}
          disabled={isLoading}
          onChange={onChange}
          placeholder="Song title"
        />
      </div>
      <div className='h-80 overflow-y-auto mt-5'>
        {(songs.length !== 0 && query.length !== 0) ? songs.map((song) => (
          <div key={song.id} className='mb-5 mt-5'>
            <SearchItem
            image={song.album.images[0].url} 
            name={song.name}
            author={song.artists[0].name}
            href={song.album.uri}
          />
          </div>
        )
        ) : (
          <div className='text-neutral-400 h-40'>
            No songs available.
          </div>
        )}
      </div>
    </Modal>
    
  );
};

export default SearchModal;