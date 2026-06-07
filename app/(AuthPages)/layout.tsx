import CommonNavBar from "@/src/components/NavComponents/CommonNavBar";
import NavLogo from "@/src/components/NavComponents/NavLogo";
import ThemeButton from "@/src/components/NavComponents/ThemeButton";

import Link from "next/link";

import "./authPagesLayout.css";

export default function AuthPages({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="auth-pages-layout-header">
        <CommonNavBar className="auth-pages-nav-bar">
          <NavLogo />
          <ThemeButton />
        </CommonNavBar>
      </header>

      <Link className="AuthPages__home-page-button" href="/">
        Go to Home Page
      </Link>
      <main className="auth-pages-layout-main">{children}</main>
    </>
  );
}
