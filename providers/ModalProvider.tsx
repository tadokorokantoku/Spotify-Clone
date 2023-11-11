"use client";

import { useEffect, useState } from 'react';
import Modal from '@/components/Modal'
import AuthModal from '@/domain/AuthoModal/AuthModal';
import UploadModal from '@/domain/UploadModal/UploadModal';
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
      <UploadModal />
      <SearchModal />
    </>
  );
};

export default ModalProvider;