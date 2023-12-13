"use client";
// import { db, storage } from "@/firebase";
import { db, storage } from "../firebase"
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { serverTimestamp } from "firebase/database";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";

const DropZone = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        // Do whatever you want with the file contents
        await upLoadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
    console.log(acceptedFiles);
  };

  const upLoadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    //do what needs to be done with your firebase storage here
    // addDoc -> users/user12345/files
    const documentReference = await addDoc(
      collection(db, "users", user.id, "files"),
      {
        fileName: selectedFile.name,
        fullName: user?.fullName,
        fileSize: selectedFile.size,
        profileImg: user.imageUrl,
        timestamp: serverTimestamp(),
        fileType: selectedFile.type,
      }
    );

    //store profile img in firebase storage
    const imageRef = ref(storage, `users/${user.id}/files/${documentReference.id}`);

    //upload image to firebase storage
    await uploadBytes(imageRef, selectedFile).then(async(snapshot) => {
        //get download link from firebase storage
        const downloadURL = await getDownloadURL(
            imageRef
        );
        await updateDoc(doc(db, "users", user.id, "files", documentReference.id), {
            fileUrl: downloadURL,
        })
    });
    setLoading(false);
  };


const maxSize = 3048576;

return (
  <DropzoneComponent
    minSize={0}
    maxSize={maxSize}
    onDrop={onDrop}
  >
    {({
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
      fileRejections,
    }) => {
      const isFileTooLarge =
        fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
      return (
        <section className="m-4">
          <div
            {...getRootProps()}
            className={cn(
              "flex justify-center items-center p-5 border border-dashed rounded-lg text-center cursor-pointer w-full h-52",
              isDragActive
                ? "border-green-500 bg-blue-800 text-white animate-pulse"
                : "border-gray-300 bg-slate-100/50 dark:bg-slate-8--/80 text-slate-400",
            )}
          >
            <input {...getInputProps()} />
            {!isDragActive && "Click here or drop a file to upload!"}
            {isDragAccept && "Drop it like it's hot!"}
            {isDragReject && "File type not accepted, sorry!"}
            {fileRejections.length > 0 && (
              <div>{fileRejections[0].errors[0].message}</div>
            )}
          </div>
        </section>
      );
    }}
  </DropzoneComponent>
)
};
export default DropZone;
