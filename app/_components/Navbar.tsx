"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-slate-700 border border-slate-700 px-4 py-2 text-white w-full relative px-10">
      {/* Logo */}
      <Link href="/#">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="object-cover"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 ml-7">
        {[
          { label: "Properties", link: "#properties" },
          { label: "About", link: "#about" },
          { label: "Looking For", link: "#looking-for" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.link}
            className="relative overflow-hidden h-6 group"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item.label}
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4 ml-10">
        <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
          Contact
        </button>

        {!user ? (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        ) : (
          <UserButton />
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 bg-slate-800 w-full flex flex-col items-center py-6 gap-4 z-50">
          <a className="hover:text-indigo-400" href="#">
            Products
          </a>
          <a className="hover:text-indigo-400" href="#">
            Stories
          </a>
          <a className="hover:text-indigo-400" href="#">
            Pricing
          </a>
          <a className="hover:text-indigo-400" href="#">
            Docs
          </a>

          <button className="border border-slate-600 hover:bg-slate-900 px-4 py-2 rounded-full text-sm font-medium transition">
            Contact
          </button>

          {!user ? (
            <SignInButton>
              <Button className="w-[200px] bg-white text-black">
                Get Started
              </Button>
            </SignInButton>
          ) : (
            <UserButton />
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
