import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 gap-4 p-6">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}