import  { PiUserCircleThin } from 'react-icons/pi'
import { useUsers } from './useUsers';

const Library = () => {
  const users = useUsers();

  return (
    <div className="flex flex-col">
      <div
        className="
          flex
          items-center
          justify-between
          px-5
          pt-4
        "
      >
      </div>
      <div className='
        flex
        flex-col
        gap-y-2
        mt-4
        px-3
      '>
        {users.map((user) => (
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
            '
          >
            <PiUserCircleThin className='text-2xl' />
            <div className='text-white'>
              {user.full_name ?? 'No name'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Library;