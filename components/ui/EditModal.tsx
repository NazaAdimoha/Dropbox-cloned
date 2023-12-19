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
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Input } from "./input";
import { rename } from "fs";

export function EditModal() {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState<string>("");

  const [isEditModalOpen, setIsEditModalOpen, fileId, setFileId, filename] =
    useFileStore((state) => [
      state.isEditModalOpen,
      state.setIsEditModalOpen,
      state.fileId,
      state.setFileId,
      state.filename
    ]);

  //create a delete function
  const renameFile = async () => {
    if (!user || !fileId) return;

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
        filename: inputValue,
    })

    //set input ro empty string
    setInputValue("");
    setIsEditModalOpen(false);

    //set up a try catch block to delete file from storage
  
  };
  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={(isOpen) => setIsEditModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the File</DialogTitle>
        </DialogHeader>
        
        <Input 
            id="rename-file"
            defaultValue={filename}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Rename the file"
            onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                    renameFile()
                }
            }}
        />
        <div className="flex items-center py-3 space-x-2">
          <Button
            onClick={() => setIsEditModalOpen(false)}
            variant={"ghost"}
            size="sm"
            className="px-3 flex-1"
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            onClick={() => renameFile()}
            type="submit"
            size="sm"
            className="px-3 flex-1"
          >
            <span className="sr-only">Delete</span>
            Delete
          </Button>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
