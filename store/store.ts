import { create } from "zustand";

// create an interface for that mirrors my store
interface FileStoreState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;

    fileId: string | null;
    setFileId: (fileId: string) => void;

    filename: string;
    setFilename: (filename: string) => void;
}

export const useFileStore = create<FileStoreState>((set) => ({
    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open: boolean) => set((state) => ({ isDeleteModalOpen: open })),

    isEditModalOpen: false,
    setIsEditModalOpen: (open: boolean) => set((state) => ({ isEditModalOpen: open })),

    fileId: null,
    setFileId: (fileId: string) => set((state) => ({ fileId })),

    filename: "",
    setFilename: (filename: string) => set((state) => ({ filename })),
}));