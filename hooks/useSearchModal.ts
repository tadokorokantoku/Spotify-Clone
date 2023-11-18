import { create } from 'zustand';

interface SearchModalStore {
  isOpen: boolean;
  isExchanging: boolean;
  exchangeTargetId: string | null;
  onOpen: () => void;
  onExchange: (id: string) => void;
  onClose: () => void;
}

const useSearchModal = create<SearchModalStore>(set => ({
  isOpen: false,
  isExchanging: false,
  exchangeTargetId: null,
  onOpen: () =>
    set({ isOpen: true, isExchanging: false, exchangeTargetId: null }),
  onClose: () =>
    set({ isOpen: false, isExchanging: false, exchangeTargetId: null }),
  onExchange: (id: string) =>
    set({ isOpen: true, isExchanging: true, exchangeTargetId: id }),
}));

export default useSearchModal;
