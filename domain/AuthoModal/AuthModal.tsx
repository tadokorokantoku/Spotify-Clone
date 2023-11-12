"use client";

import { FC, useEffect } from 'react';
import Modal from "../../components/Modal"
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { useRouter } from 'next/navigation';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';


interface AuthModalProps {};

const AuthModal: FC<AuthModalProps> = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext(); 
  const { onClose, isOpen, isSignUp } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose;
    }
  }, [onClose, router, session])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal
      title={isSignUp ? 'Please create your account!' : 'Welcome back!'}
      description={isSignUp ? '' : 'Login to your account'} 
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        theme="dark"
        view={isSignUp ? 'sign_up' : 'sign_in'}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e' 
              }
            }
          }
        }}
      />
    </Modal>
  );
};

export default AuthModal;