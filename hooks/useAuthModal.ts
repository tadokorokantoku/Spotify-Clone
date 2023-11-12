import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  isSignUp: boolean;
  onSingIn: () => void;
  onSingUp: () => void;
  onClose: () => void;
};

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  isSignUp: false,
  onSingIn: () => set({ isOpen: true, isSignUp: false }),
  onSingUp: () => set({ isOpen: true, isSignUp: true }),
  onClose:  () => set({ isOpen: false, isSignUp: false }),
}))

export default useAuthModal;
