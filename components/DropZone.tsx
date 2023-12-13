"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
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
        console.log(acceptedFiles)
    };

  const upLoadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);


    setLoading(false);
  };  
  const maxSize = 1048576;

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
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
            <div {...getRootProps()}
                className={
                    cn(
                        "flex justify-center items-center p-5 border border-dashed rounded-lg text-center cursor-pointer w-full h-52",
                        isDragActive ? "border-green-500 bg-blue-800 text-white animate-pulse" : "border-gray-300 bg-slate-100/50 dark:bg-slate-8--/80 text-slate-400",
                        isDragAccept ? "border-green-500" : "border-gray-300 bg-slate-100/50 dark:bg-slate-8--/80 text-slate-400",
                        isDragReject ? "border-red-500" : "border-gray-300 bg-slate-100/50 dark:bg-slate-8--/80 text-slate-400",
                        isFileTooLarge ? "border-red-500" : "border-gray-300 bg-slate-100/50 dark:bg-slate-8--/80 text-slate-400",
                    )
                }
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
  );
};

export default DropZone;
