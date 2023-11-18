import Header from '@/domain/Header/Header'
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
      </Header>
      <PageContent songs={songs} />
    </div>
  )
}
 