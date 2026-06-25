"use client";

import "@/src/css/offline.css";

export default function Offline() {
  return (
    <div className="no-connection-section">
      <h1 className="no-connection-section__header">
        Connection Error! Please Connect To The Internet
      </h1>
    </div>
  );
}
