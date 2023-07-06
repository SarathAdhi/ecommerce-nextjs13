"use client";

import { create } from "zustand";

interface UseAppStoreProps {
  user: User | null;
  setUser: (user: User | null) => void;
  seller: Seller | null;
  setSeller: (seller: Seller | null) => void;
}

export const useAppStore = create<UseAppStoreProps>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  seller: null,
  setSeller: (seller) => set({ seller }),
}));
