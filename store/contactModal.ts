import { create } from 'zustand';

export type ContactModalVariant = 'contact' | 'quote';

interface ContactModalStore {
  isOpen: boolean;
  variant: ContactModalVariant;
  open: (variant?: ContactModalVariant) => void;
  close: () => void;
}

export const useContactModalStore = create<ContactModalStore>((set) => ({
  isOpen: false,
  variant: 'contact',
  open: (variant = 'contact') => set({ isOpen: true, variant }),
  close: () => set({ isOpen: false }),
}));
