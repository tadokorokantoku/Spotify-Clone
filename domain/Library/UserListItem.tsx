import { UserDetails } from '@/types';
import { FC } from 'react';
import useLoadImage from '@/hooks/useLoadImage';
import { Avatar } from '@mantine/core';
import { PiUserCircleThin } from 'react-icons/pi';

interface userListItemProps {
  user: UserDetails;
}

const UserListItem: FC<userListItemProps> = ({ user }) => {
  const image = useLoadImage(user.avatar_url ?? '');
  return (
    <div
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
