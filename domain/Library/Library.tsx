import { useUser } from '@/hooks/useUser';
import styles from './Library.module.css';
import UserListItem from './UserListItem';
import { useUsers } from './useUsers';

const Library = () => {
  const { user: me } = useUser();
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
        <p className={styles.label}>最近追加されたユーザー</p>
        {users
          .filter(user => user.id !== me?.id)
          .map(user => (
            <UserListItem key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
};

export default Library;
