import { Suspense } from "react";

import ToastWrapper from "./ToastWrapper";
import Loading from "@/app/loading";
import AuthWrapper from "./AuthWrapper";
import SearchPostWrapper from "./SearchPostWrapper";
// import ConnectionProvider from "../libs/ConnectionProvider";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthWrapper>
        <ToastWrapper>
          <SearchPostWrapper>{children}</SearchPostWrapper>
        </ToastWrapper>
      </AuthWrapper>
    </Suspense>
  );
}
