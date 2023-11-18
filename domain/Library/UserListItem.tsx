import useLoadImage from '@/hooks/useLoadImage';
import { UserDetails } from '@/types';
import { Avatar } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface userListItemProps {
  user: UserDetails;
}

const UserListItem: FC<userListItemProps> = ({ user }) => {
  const image = useLoadImage(user.avatar_url ?? '');
  const router = useRouter();
  const handleClick = () => {
    router.push(`user/${user.id}`);
  };
  return (
    <div
      onClick={handleClick}
      onKeyDown={handleClick}
      key={user.id}
      className='
        flex
        items-center
        gap-x-3
        p-2
        rounded-md
        hover:bg-gray-700
        transition
        cursor-pointer
      '
    >
      <Avatar radius='md' src={image} alt="it's me" />
      <div className='text-white'>{user.full_name ?? 'No name'}</div>
    </div>
  );
};

export default UserListItem;
