import { create } from 'zustand'

interface CreateProps {
    isOpen: boolean;
    onOpen: () =>void;
    onClose: () =>void
}

const useCategoryModal = create<CreateProps>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({ isOpen: false }),
}))

export default useCategoryModal