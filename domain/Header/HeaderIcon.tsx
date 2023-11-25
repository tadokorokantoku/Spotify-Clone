import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import useLoadImage from '@/hooks/useLoadImage';
import { UserDetails } from '@/types';
import { Avatar, Divider, Menu, Text } from '@mantine/core';
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
      <Button onClick={() => {}} variant={'link'}>
        {image ? (
          <Avatar radius='md' src={image} alt="it's me" />
        ) : (
          <FaUserAlt />
        )}
      </Button>
    </div>
  );
};

export default HeaderIcon;
