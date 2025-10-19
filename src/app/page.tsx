import CreatePost from "@/components/CreatePost"
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server"

async function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <CreatePost />
      </div>
      <div className="hidden lg:block lg:col-span-4">
          <WhoToFollow />
      </div>

    </div>
  )
}

export default Home