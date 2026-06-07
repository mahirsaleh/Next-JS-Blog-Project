// import MyError from "@/app/error";
import { ConvexClientProvider } from "@/src/libs/ConvexClientProvider";
import { getToken } from "@/src/libs/auth-server";

export default async function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  let token: string | undefined;

  try {
    token = await getToken();
  } catch (error) {
    const authError =
      error instanceof Error ? error : new Error("Something Went Wrong");

    throw authError;
  }

  // if (token) {
  //   return (
  //     <ConvexClientProvider initialToken={token}>
  //       {children}
  //     </ConvexClientProvider>
  //   );
  // } else {
  //   return <MyError error={new Error('Something Went Wrong!')} />
  // }

  return (
      <ConvexClientProvider initialToken={token}>
        {children}
      </ConvexClientProvider>
    );
}
