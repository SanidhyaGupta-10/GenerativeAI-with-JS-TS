"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { Loader2, Menu } from "lucide-react";

function Navbar() {
  return (
    <div>
      {/* Left Side */}
      <div>
        <h1>VectorFlow</h1>
        <p>Chat With Your Documents</p>
      </div>

      {/* Right Side */}
      <div>
        <div className="flex items-center gap-4">
          <SignInButton mode="modal">
            <button className="text-sm font-medium text-white/50 hover:text-white transition-colors">
              Login
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="btn-primary text-xs py-2 px-4">
              Get Started
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
