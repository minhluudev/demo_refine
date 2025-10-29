import { create } from "zustand";

interface UserState {
  permission: string | null;
  setPermission: (permission: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  permission: null,
  setPermission: (permission: string) => set({ permission }),
}));
