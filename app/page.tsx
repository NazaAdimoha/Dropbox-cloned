import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox. <br />
            <br />
            Storing all your files and business needs. All in one place
          </h1>

          <p className="pb-20">
            Enhance your storage with Dropbox, offering a simple, yet efficient
            way to store, upload, and access your files from anywhere. Securely
            store important documents and media, and experience of easy file
            management, and sharing in one centralized easy solution.
          </p>

          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 w-fit p-5"
          >
            Try it for free!
            <ArrowRight className="ml-10" />
          </Link>

          <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
            <video 
              className="rounded-lg video-tag "
              autoPlay
              loop
              muted
            >
              <source 
                src="https://www.youtube.com/embed/?enablejsapi=1&rel=0&autoplay=0&playsinline=1&expflag=embeds_enable_muted_autoplay%3Atrue&fs=1.com"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>

      <p className="text-center p-2 font-bold text-xl pt-5">Disclaimer</p>
      <p className="text-center p-2 font-light">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
        mollitia ipsam nam laboriosam quasi facere ad. Suscipit libero fuga
        laboriosam fugiat, id vero ab. Totam minima odit nemo alias. Ut?
      </p>
    </main>
  );
}
