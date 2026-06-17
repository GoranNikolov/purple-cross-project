import { defineStore } from "pinia";

const STORAGE_KEY = "purple-cross-user";

export interface UserState {
  name: string;
  email: string;
  role: string;
}

const defaultState: UserState = {
  name: "Goran Nikolov",
  email: "goran@example.com",
  role: "Admin",
};

function getInitialState(): UserState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse user from local storage", e);
    }
  }
  return { ...defaultState };
}

export const useUserStore = defineStore("user", {
  state: (): UserState => getInitialState(),

  actions: {
    saveProfile(data: Partial<UserState>) {
      if (data.name) this.name = data.name;
      if (data.email) this.email = data.email;
      if (data.role) this.role = data.role;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
    },
  },
});
