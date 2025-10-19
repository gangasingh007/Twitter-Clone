import CreatePost from "@/components/CreatePost"
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server"

async function Home() {
  const user = await currentUser();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost />:null}
      </div>

      <WhoToFollow />

    </div>
  )
}

export default Home