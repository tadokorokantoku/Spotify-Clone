import axios from 'axios';
import sortBy from 'lodash/sortBy';
import qs from 'qs';

let accessToken: string | null = null;
let tokenExpirationDate: Date | null = null;

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

const getAccessToken = async (): Promise<string> => {
  if (accessToken && tokenExpirationDate && new Date() < tokenExpirationDate) {
    return accessToken;
  }

  const { data } = await axios.post<TokenResponse>(
    'https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  accessToken = data.access_token;
  tokenExpirationDate = new Date(new Date().getTime() + data.expires_in * 1000);

  return accessToken;
};

export const searchSongs = async (query: string) => {
  const accessToken = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${query}%20year:2022-2023&type=track&market=JP&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': 'ja;q=1',
      },
    },
  );

  return sortBy(response.data.tracks.items, 'popularity').reverse();
};
