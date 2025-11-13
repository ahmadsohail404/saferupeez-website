"use client";

import Image from "next/image";
import LogoImg from "../../public/assets/saferupeez.png";

export default function StickyQR() {
  return (
    <div
      className="
        fixed 
        bottom-6 right-6 
        bg-white 
        rounded-2xl 
        shadow-lg 
        border border-gray-200 
        p-4 
        z-50 
        flex flex-col items-center
        hidden md:flex
      "
      style={{ width: "150px" }}
    >
      <p className="text-center text-gray-700 text-sm mb-2 font-medium">
        Scan to download
      </p>

      <div className="w-full rounded-xl overflow-hidden">
        <Image
          src={LogoImg}
          alt="QR Code"
          width={250}
          height={250}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
