import Header from '@/domain/Header/Header';
import { useUser } from '@/hooks/useUser';
import PageContent from './_components/PageContent';

export const revalidate = 0;

export default async function Home() {
  return (
    <div
      className='
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    '
    >
      <Header className='mb-2'>
        <h1
          className='
            text-white
            text-3xl
            font-semibold
          '
        >
          マイページ
        </h1>
      </Header>
      <PageContent />
    </div>
  );
}
