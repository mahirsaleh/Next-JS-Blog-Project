import PagesNav from "@/src/components/NavComponents/PagesNav";

import Toast from "@/src/components/Toast";
import "./pageLayout.css";
import CustomFooter from "@/src/components/Footer/CustomFooter";
import ScrollTopButton from "@/src/components/ScrollTopButton/ScrollTopButton";
import SearchBar from "@/src/components/Search/SearchBar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toast />
      <ScrollTopButton />
      <SearchBar />

      <header className="pages-layout-header">
        <PagesNav />
      </header>
      <main className="pages-layout-main">{children}</main>
      <footer>
        <CustomFooter />
      </footer>
    </>
  );
}
