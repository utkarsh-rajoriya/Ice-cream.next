// "use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center h-20 gap-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contact">contact</Link>
    </div>
  );
};

export default Navbar;
