import { create } from "zustand";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  sessionId: null,
  loader: {
    checkAuth: false,
    login: false,
    signup: false,
  },
  error: {
    checkAuth: null,
    login: null,
    signup: null,
  },

  // Helper methods for loader and error states
  _setLoader: (key, value) => {
    set((state) => ({
      loader: { ...state.loader, [key]: value },
    }));
  },

  _setError: (key, value) => {
    set((state) => ({
      error: { ...state.error, [key]: value },
    }));
  },

  // Check Auth
  checkAuth: async () => {
    const state = get();
    state._setLoader("checkAuth", true);
    state._setError("checkAuth", null);

    try {
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data.user || null});
      
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to verify session";
      set({ authUser: null });
      state._setError("checkAuth", msg);
      console.error(error);
    } finally {
      state._setLoader("checkAuth", false);
    }
  },

  // Login
  login: async (data) => {
    const state = get();
    state._setLoader("login", true);
    state._setError("login", null);

    try {
      const res = await axiosInstance.post("/auth/login", data);
      const { user, sessionId } = res.data;
      set({ authUser: user, sessionId });
      toast.success("Log in successful");
    } catch (error) {
        console.log(error);
      const msg = error.response?.data?.message || "Error while logging in";
      set({ authUser: null });
      state._setError("login", msg);
      toast.error(msg);
    } finally {
      state._setLoader("login", false);
    }
  },

  // Signup
  signup: async (data) => {
    const state = get();
    state._setLoader("signup", true);
    state._setError("signup", null);

    try {
      console.log(data);
      const res = await axiosInstance.post("/auth/signup", data);
      const { message, user } = res.data;
      console.log(res);
      set({ authUser: user });
      toast.success(message);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Error while signing up";
      state._setError("signup", msg);
      toast.error(msg);
      return { success: false };
    } finally {
      state._setLoader("signup", false);
    }
  },
}));
