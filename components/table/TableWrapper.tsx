import { FileType } from "@/typings"
import { Button } from "../ui/button"
import { DataTable } from "./Table"
import columns from "./columns"

const TableWrapper = ({
    skeletonFiles
}: { skeletonFiles: FileType[]}) => {
  return (
    <div>
      <Button 
        className="mb-10"
      >
        Sort By...
      </Button>

      {/* Table Data */}
      <DataTable 
        columns={columns}
        data={skeletonFiles}
      />
    </div>
  )
}

export default TableWrapper
