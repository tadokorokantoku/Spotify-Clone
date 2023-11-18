import UserListItem from './UserListItem';
import { useUsers } from './useUsers';

const Library = () => {
  const users = useUsers();

  return (
    <div className='flex flex-col'>
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
