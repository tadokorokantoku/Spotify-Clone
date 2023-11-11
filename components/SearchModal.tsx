import { ChangeEvent, FC, useState } from 'react';
import Modal from './Modal';

import { searchSongs } from '@/hooks/useSearchSongs';
import Input from '@/components/Input';
import ListItem from '@/components/ListItem'

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


  console.log(songs.length);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    const query = value
    searchSongs(query).then((songs) => {
      console.log(songs);
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
        />
      </div>
      <div>
        {songs.length !== 0 && query.length !== 0 && songs.map((song) => (
          <div key={song.id} className='mb-5 mt-3'>
            <ListItem
            image={song.album.images[0].url} 
            name={song.name}
            href={song.album.uri}
          />
          </div>
        )
        )}
      </div>
    </Modal>
    
  );
};

export default SearchModal;