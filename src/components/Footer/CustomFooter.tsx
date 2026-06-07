import Link from "next/link";

import { AiFillGithub } from "react-icons/ai";
import { FaFacebookSquare, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FooterYear from "./FooterYear";

import "@/src/css/customFooter.css";

export default function Footer() {
  return (
    <div className="FooterDiv">
      <div className="FooterDiv__curved-div">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M-1.69,0.52 C196.38,181.47 357.22,-70.88 498.87,148.21 L501.69,150.17 L0.00,149.67 Z"></path>
        </svg>
      </div>

      <div className="FooterDiv__info-div">
        <p className="info-div__heading">Contact Us</p>
        <div className="info-div__links">
          <Link
            className="links__link"
            href="http://github.com/mahirsaleh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </Link>
          <Link
            className="links__link"
            href="http://Wa.me/+8801633657905"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </Link>
          <Link
            className="links__link"
            href="mailto:mahirsaleh001@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdEmail />
          </Link>
          <Link
            className="links__link"
            href="https://www.facebook.com/mmmmmmaaaaaahhhhhhiiiiiirrrrrr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookSquare />
          </Link>
        </div>

        <FooterYear />
      </div>
    </div>
  );
}
