'use client';

import useAuthModal from '@/hooks/useAuthModal';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import Modal from '../../components/Modal';

const AuthModal: FC = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen, isSignUp } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose;
    }
  }, [onClose, router, session]);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          // signInやsignUpが正常に完了した時に実行したい関数をここに書く
          onClose();
        }
      },
    );

    // Cleanup subscription on unmount
    // return () => {
    //   supabaseClient.removeChannel(authListener);
    // };
  }, [onClose, supabaseClient.auth]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title={isSignUp ? 'Please create your account!' : 'Welcome back!'}
      description={isSignUp ? '' : 'Login to your account'}
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        theme='dark'
        view={isSignUp ? 'sign_up' : 'sign_in'}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
