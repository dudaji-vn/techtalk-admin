"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { keyStorage } from "@/const/key-storage";
import { validateToken } from "../utils/validate-token";

export default function protectPage(Component: any) {
  return function ProtectPage(props: any) {
    const accessToken = localStorage.getItem(keyStorage.accessToken);
    const isAuthenticate = accessToken && validateToken(accessToken);

    useEffect(() => {
      if (!isAuthenticate) {
        return redirect("/auth/signin");
      }
    }, []);

    if (!isAuthenticate) {
      return null;
    }

    return <Component {...props} />;
  };
}
