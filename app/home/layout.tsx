"use client";
import { useState } from "react";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white overflow-hidden flex h-screen ml-20">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col max-w-screen overflow-hidden">
        <Header />
        <main>
          <div className="mx-auto max-w-screen-2xl ">{children}</div>
        </main>
      </div>
    </div>
  );
}
