import { create } from 'zustand'

interface ModalsStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void

}

const useLoginModal = create<ModalsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default useLoginModal