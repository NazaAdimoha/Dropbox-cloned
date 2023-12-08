import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ModeToggle } from "./ModeToggle"

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link 
        href="/"
        className="flex items-center space-x-3"
      >
        <div className="bg-[#0160FE] w-fit rounded-2xl p-4">
            <Image 
                src="https://cdn-icons-png.flaticon.com/512/37/37540.png"
                alt="Dropbox"
                width={40}
                height={40}
                className="invert"
            />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>

      {/* Theme comtrol */}
      <div className="px-5 flex items-center space-x-2">
        <UserButton 
            afterSignOutUrl="/"
        />

        <SignedOut>
            <SignInButton 
                afterSignInUrl="/dashboard"
                mode="modal"
            />    
        </SignedOut> 
        <Button variant="outline">
            Learn more
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
