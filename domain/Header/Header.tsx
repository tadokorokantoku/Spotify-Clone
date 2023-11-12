"use client"

import React, { FC } from 'react';
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge';
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'

import Button from '@/components/Button'
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
};

const Header: FC<HeaderProps> = ({
  children,
  className
}) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const  {error} = await supabaseClient.auth.signOut()

    router.refresh();

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <div
      className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
      `,
      className)}>
        <div className='
          w-full
          mb-4
          flex
          items-center
          justify-between
        '>
          <div className="
            hidden
            md:flex
            gap-x-2
            items-center
          ">
            <button
            onClick={() => router.back()} 
            className='
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            '>
              <RxCaretLeft className="text-white" size={35} />
            </button>
            <button
            onClick={() => router.forward()}  
            className='
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            '>
              <RxCaretRight className="text-white" size={35} />
            </button>
          </div> 
          {user ? (
            <div className='flex gap-x-4 items-center'>
              <Button
                onClick={handleLogout}
                className='bg-white px-6 py-2'
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className='bg-white'
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onSingUp}
                  className='
                    bg-transparent
                    text-neutral-300
                    font-medium
                  '
                >
                  Sign up
                </Button>
                <Button
                  onClick={authModal.onSingIn}
                  className='
                    bg-white
                    px-6
                    py-2
                  '
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
        {children}
    </div>
  )
};

export default Header;