import { useSearchPostContext } from "@/src/contextProviders/MyContexts";
import "@/src/css/Search/navSearchButton.css";
import { Dispatch } from "react";

type TProps = {
  setIsChildNavShowHide: Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
};

export default function NavSearchButton({
  setIsChildNavShowHide,
  isAuthenticated,
}: TProps) {
  const { setIsShowSearchBar } = useSearchPostContext();

  const navSearchButtonOnClickHandler = function () {
    if (!isAuthenticated) return;

    setIsChildNavShowHide(false);

    setIsShowSearchBar(true);
  };

  return (
    <button
      type="button"
      className="nav-search-button"
      onClick={navSearchButtonOnClickHandler}
    >
      Search
    </button>
  );
}
