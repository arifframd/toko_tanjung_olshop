import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "sonner";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
      <Toaster />
    </main>
  );
}
