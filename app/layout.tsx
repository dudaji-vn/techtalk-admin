"use client";
import Loader from "@/components/common/loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
const queryClient = new QueryClient();
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <ToastContainer />
          <div className="dark:bg-boxdark-2 dark:text-bodydark">{loading ? <Loader /> : <div>{children}</div>}</div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
