"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { set } from "firebase/database";
import { useFileStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Input } from "./input";

export function EditModal() {
  const { user } = useUser();
  const [input, setInput] = useState<string>("");

  const [isEditModalOpen, setIsEditModalOpen, fileId, filename] =
    useFileStore((state) => [
      state.isEditModalOpen,
      state.setIsEditModalOpen,
      state.fileId,
      state.filename,
    ]);

  //create a delete function
  const renameFile = async () => {
    if (!user || !fileId) return;
    await updateDoc(doc(db, "users", user.id, "files", fileId), {
        fileName: input,
    });

    //set input ro empty string
    setInput("");
    setIsEditModalOpen(false);
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
          id="link"
          defaultValue={filename}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Rename the file"
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              renameFile();
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
            <span className="sr-only">Rename File</span>
            <span>Rename File</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
