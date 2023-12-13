import DropZone from "@/components/DropZone"
import { auth } from "@clerk/nextjs"

const Dashboard = () => {
    const { userId } = auth()
  return (
    <div className="">
        <DropZone />
    </div>
  )
}

export default Dashboard
