'use client';
import useSongs from '@/actions/useSongs';
import { useTargetUser } from '@/actions/useTargetUser';
import Best10Songs from '@/domain/Best10Songs/Best10Songs';
import Header from '@/domain/Header/Header';
import useLoadImage from '@/hooks/useLoadImage';
import { Avatar } from '@mantine/core';

interface OtherUserProps {
  prop: string;
}

// export async function generateStaticParams() {
//   const users = await fetch('https://.../user').then(res => res.json());

//   return users.map((user: { pid: string }) => ({
//     userIds: user.pid,
//   }));
// }

export default function OtherUser({ params }: { params: { pid: string } }) {
  const user = useTargetUser(params.pid);
  const songs = useSongs(params.pid);
  const image = useLoadImage(user?.avatar_url ?? '');

  if (!user) return null;

  console.log('user', user);

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
        <div className='flex gap-10'>
          <Avatar size='xl' radius='md' src={image} alt='target user' />
          <h1
            className='
            flex
            text-white
            text-5xl
            font-semibold
            items-center
          '
          >
            {user.full_name ?? 'No name'}
          </h1>
        </div>
      </Header>
      <div className='p-8'>
        <Best10Songs songs={songs} forMe={false} />
      </div>
    </div>
  );
}
