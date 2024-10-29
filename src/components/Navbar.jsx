import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3 shadow-lg">
      <Link href={"/"} aria-label="Home">
        <Image
          src="/logoIDP.png"
          alt="Next.js Logo"
          width={50}
          height={17}
          priority
        />
      </Link>
      <div className="flex space-x-4">
        <Link
          href={"/viewcvs"}
          className="inline-flex items-center px-4 py-2 font-medium text-center text-white bg-slate-700 hover:bg-slate-900 rounded-lg transition-colors duration-300"
          aria-label="View CVs"
        >
          List CVS
        </Link>
        <Link
          href={"/upload"}
          className="inline-flex items-center px-4 py-2 font-medium text-center text-white bg-slate-700 hover:bg-slate-900 rounded-lg transition-colors duration-300"
          aria-label="Upload CVs"
        >
          Upload CVS
        </Link>
        <Link
          href={"/create"}
          className="inline-flex items-center px-4 py-2 font-medium text-center text-white bg-slate-700 hover:bg-slate-900 rounded-lg transition-colors duration-300"
          aria-label="Create CV"
        >
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
