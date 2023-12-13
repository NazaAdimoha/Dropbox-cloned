import DropZone from "@/components/DropZone"
import TableWrapper from "@/components/table/TableWrapper"
import { db } from "@/firebase"
import { FileType } from "@/typings"
import { auth } from "@clerk/nextjs"
import { collection, getDocs } from "firebase/firestore"

const Dashboard = async () => {
    const { userId } = auth()

    const docsResults = await getDocs(
        collection(db, "users", userId!, "files")
    )

    //create skeleton loader && run a data transformation
    const skeletonFiles: FileType[] = docsResults?.docs?.map((doc) => ({
        id: doc?.id,
        fileName: doc?.data().fileName,
        timestamp: new Date(doc?.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc?.data().fullName,
        downloadUrl: doc?.data().downloadUrl,
        type: doc?.data().type,
        size: doc?.data().size,

        ...doc?.data(),
    }))
    console.log(skeletonFiles)
  return (
    <div className="border-t">
        <DropZone />

        <section className="container space-y-5">
            <h2 className="font-bold">All Files</h2>

            <div>
                {/* Table Wrapper */}
                <TableWrapper 
                    skeletonFiles={skeletonFiles}
                />
            </div>
        </section>
    </div>
  )
}

export default Dashboard
