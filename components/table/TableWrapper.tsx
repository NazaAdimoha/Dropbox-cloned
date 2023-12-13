import { FileType } from "@/typings"
import { Button } from "../ui/button"

const TableWrapper = ({
    skeletonFiles
}: { skeletonFiles: FileType[]}) => {
  return (
    <div>
      <Button>
        Sort By...
      </Button>

      {/* Table Data */}
      
    </div>
  )
}

export default TableWrapper
