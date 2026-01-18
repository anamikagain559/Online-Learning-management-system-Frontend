import React from "react";
import Navbar from "@/components/Navbar";
import {Footer} from "@/components/Footer";

type CommonLayoutProps = {
  children: React.ReactNode;
};

export default function CommonLayout({ children }: CommonLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 min-h-screen ">{children}</main>
      <Footer className="pl-6"/>
    </div>
  );
}
