'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("activeUser");
    const activeUser = storedUser ? JSON.parse(storedUser) : null;

    if (activeUser) {
      router.push("/app/employees");
    } else {
      router.push("/login");
    }
  }, []);

  return null; // or a loading indicator if you want
}
