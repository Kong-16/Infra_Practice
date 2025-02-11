import { create } from 'zustand';

interface UserState {
  username: string | null;
  userId: string | null;
  accessToken: string | null;

  setUser: (key: string, value: string) => void;
  clearUser: () => void;
}

const initialState = {
  username: null,
  userId: null,
  accessToken: null,
};

const useUserStore = create<UserState>((set, get) => ({
  ...initialState,

  setUser: (key, value) => set({ [key]: value }),
  clearUser: () => {
    set(initialState);
  },
}));

export default useUserStore;
