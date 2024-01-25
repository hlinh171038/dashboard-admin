import { create } from 'zustand'

interface SidebarStore {
    isOpen: boolean;
    onOpen:() =>void;
    onClose: () => void;
}

const useSidebar = create<SidebarStore>((set) => ({
  isOpen: true,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({ isOpen: false }),
}))

export default useSidebar