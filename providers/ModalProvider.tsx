"use client";

import { useEffect, useState } from 'react';
import AuthModal from '@/domain/AuthoModal/AuthModal';
import UserRegisterModal from '@/domain/UserRegisterModal/UserRegisterModal';
import SearchModal from '@/domain/SearchModal/SearchModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    }
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UserRegisterModal />
      <SearchModal />
    </>
  );
};

export default ModalProvider;