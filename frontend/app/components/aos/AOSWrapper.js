"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSWrapper({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      mirror: true,
    });
  }, []);

  return <>{children}</>;
}
