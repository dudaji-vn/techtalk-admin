"use client";
import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? (
        <Loader />
      ) : (
        <div className="fixed top-0 flex h-full w-full bg-blackCt items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
