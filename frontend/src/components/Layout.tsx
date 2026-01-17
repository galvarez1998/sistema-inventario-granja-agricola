import React from "react";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100%",
      backgroundColor: "#f3f4f6",
      overflowX: "hidden"
    }}>
      <Header />
      <main style={{
        flex: "1",
        overflowY: "auto",
        overflowX: "hidden",
        width: "100%"
      }}>
        {children}
      </main>
    </div>
  );
}