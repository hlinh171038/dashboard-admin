import { create } from 'zustand'

interface RegisterCreate {
    isOpen: boolean,
    onOpen: () =>void;
    onClose: () =>void;
}

const useRegister = create<RegisterCreate>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () =>set({isOpen: false})
}))

export default useRegister