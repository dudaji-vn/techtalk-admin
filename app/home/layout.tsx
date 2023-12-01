'use client';
import { useState } from 'react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white overflow-hidden flex h-screen ml-22">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col max-w-screen overflow-hidden">
        <Header />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6  ">{children}</div>
        </main>
      </div>
    </div>
  );
}
