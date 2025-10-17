import ModeToggle from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

function Home() {
  return (
    <div className="mt-1">
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>  
        </ SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Button variant={"secondary"}>Click Me</Button>
      <ModeToggle />
    </div>
  )
}

export default Home