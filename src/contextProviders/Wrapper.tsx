import { Suspense } from "react";

import ToastWrapper from "./ToastWrapper";
import Loading from "@/app/loading";
import AuthWrapper from "./AuthWrapper";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthWrapper>
        <ToastWrapper>{children}</ToastWrapper>
      </AuthWrapper>
    </Suspense>
  );
}
