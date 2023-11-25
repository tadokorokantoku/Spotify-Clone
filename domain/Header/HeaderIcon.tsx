import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useLoadImage from '@/hooks/useLoadImage';
import { UserDetails } from '@/types';
import toast from 'react-hot-toast';
import { FaUserAlt } from 'react-icons/fa';

interface HeaderIconProps {
  user: UserDetails;
}

const HeaderIcon: FC<HeaderIconProps> = ({ user }) => {
  const image = useLoadImage(user?.avatar_url ?? '');
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  };

  return (
    <div className='flex gap-x-4 items-center'>
      <Button onClick={handleLogout} variant={'link'} className='text-white'>
        ログアウト
      </Button>
      <Button onClick={() => {}} variant={'link'} className='w-1'>
        {image ? (
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>{user.full_name}</AvatarFallback>
          </Avatar>
        ) : (
          <FaUserAlt />
        )}
      </Button>
    </div>
  );
};

export default HeaderIcon;
