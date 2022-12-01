import { HiLogout } from "react-icons/hi";
import { NextPage } from "next";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/token.constants";
import { useRouter } from "next/router";

export const BtnSignOut: NextPage = () => {
  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    router.push("/auth/sign-in");
  };

  return (
    <a
      onClick={signOut}
      className={
        "ring-1 flex justify-center items-center w-32 px-2 py-2 font-bold text-center text-xl select-none hover:ring-2 hover:duration-200 hover:cursor-pointer active:ring-4"
      }
    >
      로그아웃 <HiLogout className={"ml-2"} />
    </a>
  );
};

export default BtnSignOut;
