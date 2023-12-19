"use client";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { set } from "firebase/database";
import { useFileStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export function DeleteModal() {
    const { user } = useUser();

    const [
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        fileId,
        setFileId,
    ] = useFileStore((state) => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileId,
        state.setFileId,
    ])

    //create a delete function
    const deleteFile = async () => {
        if(!user || !fileId) return;

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
        
        await deleteObject(fileRef).then(async () => {
            console.log("File Deleted")
            //delete file from firestore
            deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                
            })
        }).catch((error) => {
            console.log(error)
        })
        
    }
  return (
    <Dialog 
        open={isDeleteModalOpen}
        onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the file.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center py-3 space-x-2">
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            variant={"ghost"}
            size="sm"
            className="px-3 flex-1"
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>

          </Button>

          <Button 
            onClick={() => deleteFile()}
            type="submit"
            size="sm"
            className="px-3 flex-1"
          >
            <span className="sr-only">Delete</span>
            Delete
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
