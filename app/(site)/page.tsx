import Header from '@/domain/Header/Header'
import ListItem from '@/components/ListItem'

import getSongs from '@/actions/getSongs'
import PageContent from './components/PageContent';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    ">
      <Header className='mb-2'>
        <h1
          className='
            text-white
            text-3xl
            font-semibold
          '
        >
          Welcome back!
        </h1>
        <div
          className='
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          '
        >
          <ListItem
            image="/images/liked.png" 
            name="Liked songs"
            href="liked"
          />
        </div>
      </Header>
      <PageContent songs={songs} />
    </div>
  )
}
 