import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/logo.png";

import "@/src/css/navLogo.css";

export default function NavLogo() {
  return (
    <Link className="logo-nav" href="/">
      <Image loading="eager" src={logo} alt="logo" />
    </Link>
  );
}
