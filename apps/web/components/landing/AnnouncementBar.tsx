"use client";
import { useState, useEffect } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("dp_bar_dismissed")) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="relative w-full py-2 px-10 text-center text-white text-sm font-medium"
      style={{
        background: "linear-gradient(90deg, #E8637A 0%, #C94B6D 100%)",
      }}
    >
      🌅 Now with perimenopause mode — track every life stage in one place
      <button
        onClick={() => {
          localStorage.setItem("dp_bar_dismissed", "true");
          setVisible(false);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-xl leading-none"
        aria-label="Dismiss announcement"
      >
        ×
      </button>
    </div>
  );
}
