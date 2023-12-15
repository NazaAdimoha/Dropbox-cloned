"use client";
import { FileType } from "@/typings"
import { Button } from "../ui/button"
import { DataTable } from "./Table"
import columns from "./columns"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

const TableWrapper = ({
    skeletonFiles
}: { skeletonFiles: FileType[]}) => {
    const { user } = useUser()
    const [initialFiles, setInitialFiles] = useState<FileType[]>([])
    const [sort, setSort] = useState<"asc" | "desc">("desc")

    //query hook for firebase to sort according to timestamp
    const [docs, loading, error] = useCollection(
        user ? query(
            collection(db, "users", user.id, "files"),
            orderBy("timestamp", sort)
        ) : null
    )

    //transition the data from firestore when the component mounts
    useEffect(() => {
        if(!docs) return;

        const files: FileType[] = docs?.docs?.map((doc) => ({
            id: doc?.id,
            fileName: doc?.data().fileName,
            timestamp: new Date(doc?.data().timestamp?.seconds * 1000) || undefined,
            fullName: doc?.data().fullName,
            fileUrl: doc?.data().downloadUrl,
            fileType: doc?.data().type,
            fileSize: doc?.data().size,

            ...doc?.data(),
        }))
        setInitialFiles(files)
    },[docs])
  return (
    <div>
      <Button 
        className="mb-10"
        onClick={() => {
            setSort(sort === "asc" ? "desc" : "asc")
            setInitialFiles(skeletonFiles)
        }}
      >
        {
            sort === "desc" ? "Newest" : "Oldest"
        }
      </Button>

      {/* Table Data */}
      <DataTable 
        columns={columns}
        data={initialFiles}
      />
    </div>
  )
}

export default TableWrapper
