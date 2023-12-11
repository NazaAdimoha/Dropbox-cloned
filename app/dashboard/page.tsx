import { auth } from "@clerk/nextjs"

const Dashboard = () => {
    const { userId } = auth()
  return (
    <div>
        
    </div>
  )
}

export default Dashboard
