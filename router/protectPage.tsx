"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { keyStorage } from "@/const/keyStorage";
import { validateToken } from "../utils/validateToken";

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
