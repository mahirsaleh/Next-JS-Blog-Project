import { useSearchPostContext } from "@/src/contextProviders/MyContexts";
import "@/src/css/Search/navSearchButton.css";
import { Dispatch } from "react";

type TProps = {
  setIsChildNavShowHide: Dispatch<React.SetStateAction<boolean>>;
};

export default function NavSearchButton({ setIsChildNavShowHide }: TProps) {
  const { setIsShowSearchBar } = useSearchPostContext();

  const navSearchButtonOnClickHandler = function () {
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
