import {create} from 'zustand';

interface StoreState {
    searchTitle: string;
    setSearchTitle: (title: string) => void;
}

const useStore = create<StoreState>((set) => ({
    searchTitle: '',
    setSearchTitle: (title) => set({searchTitle: title}),
}));

export default useStore;