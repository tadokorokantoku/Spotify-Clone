import { PiUserCircleThin } from 'react-icons/pi';
import { useUsers } from './useUsers';
import { Avatar } from '@mantine/core';
import UserListItem from './UserListItem';

const Library = () => {
  const users = useUsers();

  return (
    <div className='flex flex-col'>
      <div
        className='
          flex
          items-center
          justify-between
          px-5
          pt-4
        '
      ></div>
      <div
        className='
        flex
        flex-col
        gap-y-2
        mt-4
        px-3
      '
      >
        {users.map(user => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Library;
