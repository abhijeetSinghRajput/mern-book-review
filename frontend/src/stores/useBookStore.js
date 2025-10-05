import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useBookStore = create((set, get) => ({
  authUser: null,
  loader: {
    createBook: false,
    updateBook: false,
    deleteBook: false,
    updateCoverPhoto: false,
  },

  error: {
    createBook: null,
    updateBook: null,
    deleteBook: null,
    updateCoverPhoto: null,
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

  createBook: async (data) => {
    const state = get();
    state._setLoader("createBook", true);
    state._setError("createBook", null);

    try {
      const res = await axiosInstance.post("/book", data );
      console.log(res.data);
      toast.success("Book has been posted");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to Post Book";
      set({ authUser: null });
      state._setError("createBook", msg);
      console.error(error);
    } finally {
      state._setLoader("createBook", false);
    }
  },

  updateBook: async () => {
    try {
    } catch (error) {}
  },

  deleteBook: async () => {
    try {
    } catch (error) {}
  },

  updateCoverPhoto: async () => {
    try {
    } catch (error) {}
  },
}));
