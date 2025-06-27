import { UserInfo } from '@/types/user/unerInfo.interface';
import { create} from 'zustand';

interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
}

export const UserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({user}),
}));