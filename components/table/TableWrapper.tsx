"use client";
import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import columns from "./columns";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "../ui/skeleton";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  //query hook for firebase to sort according to timestamp
  const [docs, loading, error] = useCollection(
    user
      ? query(
          collection(db, "users", user.id, "files"),
          orderBy("timestamp", sort)
        )
      : null
  );

  //transition the data from firestore when the component mounts
  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs?.docs?.map((doc) => ({
      id: doc?.id,
      fileName: doc?.data().fileName,
      timestamp: new Date(doc?.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc?.data().fullName,
      fileUrl: doc?.data().downloadUrl,
      fileType: doc?.data().type,
      fileSize: doc?.data().size,

      ...doc?.data(),
    }));
    setInitialFiles(files);
  }, [docs]);

  //if loading is true, return skeleton loader
  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="w-full h-full" />
        </Button>

        {/* Table Data */}
        <div className="border rounded-lg">
          <div className="border-b h-12">
            {skeletonFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center p-5 space-x-4 w-full h-screen"
              >
                  <Skeleton className="w-12 h-12" />
                  <Skeleton className="w-full h-12 " />
              </div>
            ))}

            {/* Table Body */}
            {
                skeletonFiles.length === 0 && (
                    <div className="flex items-center space-x-4 p-5 w-fullThe ">
                        <Skeleton className="w-12 h-12 rounded-xl" />
                        <Skeleton className="w-full h-12 rounded-xl" />
                    </div>
                )
            }
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        variant={"outline"}
        className="ml-auto w-fit mb-10"
        onClick={() => {
          setSort(sort === "asc" ? "desc" : "asc");
          setInitialFiles(skeletonFiles);
        }}
      >
        {sort === "desc" ? "Sort By Newest" : "Sort By Oldest"}
      </Button>

      {/* Table Data */}
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TableWrapper;
