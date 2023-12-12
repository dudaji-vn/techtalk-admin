'use client';
import { useState } from 'react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white100 overflow-hidden flex h-screen ml-20">
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
