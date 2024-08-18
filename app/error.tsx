"use client";
// COMPONENTS
import Image from "next/image";
import Link from "next/link";

const Error = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center px-6 py-8 text-gray-800 dark:text-white">
    <div className="absolute top-0 left-0">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={350}
        height={350}
        className="object-contain"
        priority
      />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Oops!</h1>
    <p className="text-lg md:text-xl mb-8 text-balance">
      Something went wrong. We&apos;re working on it!
    </p>

    <Link href="/">
      <button className="bg-yellow-400 text-white w-24 h-10 rounded-md hover:bg-yellow-500 transition-all">
        Back 
      </button>
    </Link>
  </div>
);

export default Error;
