import { ChangeEvent, FC, useState } from 'react';
import Modal from './Modal';

import { searchSongs } from '@/hooks/useSearchSongs';
import Input from '@/components/Input';
import SearchItem from '@/components/SearchItem';
import toast from 'react-hot-toast';
import useSearchModal from '@/hooks/useSearchModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';

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

interface fetchedSong {
  id: number;
  name: string;
  artists: artist[];
  album: album;
  year: number;
  genre: string;
  duration: number;
  preview_url: string;
  file: string;

}

interface SearchModalProps {};

const SearchModal: FC<SearchModalProps> = () => {
  const searchModal = useSearchModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<fetchedSong[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    const query = value
    searchSongs(query).then((songs) => {
      setSongs(songs);
      console.log(songs);
    }).catch((e) => {
      console.log(e);
    });
  }

  const onClose = () => {
    searchModal.onClose();
    setQuery('');
    setSongs([]);
  }

  const onClickItem = async (data: fetchedSong) => {
    console.log('start', data, user);
    if (!user) {
      return;
    }

    setIsLoading(true);

    const {
      error: supabaseError
    } = await supabaseClient
    .from('songs')
    .insert({
      user_id: user.id,
      title: data.name, 
      author: data.artists[0].name,
      image_path: data.album.images[1].url,
      song_path: data.preview_url,
    });

    if (supabaseError) {
      setIsLoading(false);
      return toast.error(supabaseError.message)
    } 

    setIsLoading(false);
    toast.success('Song created!')
  }

  if (!searchModal.isOpen) {
    return null;
  }

  return (
    <Modal
      title='Search'
      description='' 
      isOpen={searchModal.isOpen}
      onChange={() => {}}
      onClose={onClose}
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
            image={song.album.images[1].url} 
            name={song.name}
            author={song.artists[0].name}
            onClick={() => onClickItem(song)}
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