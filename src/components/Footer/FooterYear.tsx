"use client";

export default function FooterYear() {
  return (
    <p className="info-div__copy-right">
      All Right Reserve {new Date().getFullYear()}
    </p>
  );
}
