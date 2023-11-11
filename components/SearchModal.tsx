import { ChangeEvent, FC, useState } from 'react';
import Modal from './Modal';

import { searchSongs } from '@/hooks/useSearchSongs';
import Input from '@/components/Input';
import { type } from 'os';

type artist = {
  name: string,
  id: string,
  type: string,
  uri: string,
}

interface fetchedSongs {
  id: number;
  name: string;
  artists: artist[];
  album: string;
  year: number;
  genre: string;
  duration: number;
  image: string;
  file: string;

}

interface SearchModalProps {};

const SearchModal: FC<SearchModalProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState<fetchedSongs[]>([]);
  console.log(songs.length);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const query = `${value}`
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
      isOpen={true}
      onChange={() => {}}
    >
      <div>
        <div className="pb-1">
          Enter the name of your favorite song!
        </div>
        <Input
          id="query"
          type="text"
          disabled={isLoading}
          onChange={onChange}
        />
      </div>
      <div>
        {songs.length !== 0 && songs[0].artists.map((artist) => (
          <div key={artist.name}>
            <p>{artist.name}</p>
          </div>
        )
        )}
      </div>
    </Modal>
    
  );
};

export default SearchModal;