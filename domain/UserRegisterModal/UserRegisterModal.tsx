'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';
import Modal from '../../components/Modal';

const UserRegisterModal: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user, userDetails } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (!user || !userDetails) {
      return;
    }
    if (!userDetails.full_name) {
      uploadModal.onOpen();
    }

    return () => {
      uploadModal.onClose();
    };
  }, [userDetails, user, uploadModal]);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const username = values.username;

      if (!imageFile || !username || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();

      // upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload.');
      }

      const { error: supabaseError } = await supabaseClient
        .from('users')
        .update({
          full_name: username,
          avatar_url: imageData.path,
        })
        .eq('id', user.id);

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('登録が完了しました!');
      reset();
      uploadModal.onClose();
    } catch (e) {
      toast.error('something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };
  return (
    <Modal
      title='ユーザー情報を登録しましょう'
      description='ユーザー名とプロフィール画像を入力してください'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <div className='pb-1'>Input your user name</div>
        <Input
          id='username'
          disabled={isLoading}
          {...register('username', { required: true })}
          placeholder='User name'
        />
        <div>
          <div className='pb-1'>Select an image</div>
          <Input
            id='image'
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type='submit'>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UserRegisterModal;
