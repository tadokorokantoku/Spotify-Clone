import { FC } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import Button from '@/components/Button';
import useLoadImage from '@/hooks/useLoadImage';
import { Avatar, Menu, Divider, Text } from '@mantine/core';
import { FaUserAlt } from 'react-icons/fa';
import { UserDetails } from '@/types';

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
      <Button onClick={handleLogout} className='bg-white px-6 py-2'>
        Logout
      </Button>
      <Button onClick={() => {}} className='bg-transparent'>
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
