import axios from 'axios';

export const searchSongs = async (query: string) => {
  const accessToken = process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN;
  const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&market=JP&limit=30`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Accept-Language': 'ja;q=1',
    }
  });
  return response.data.tracks.items;
};