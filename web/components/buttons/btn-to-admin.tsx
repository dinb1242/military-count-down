import { HiOutlineChartPie } from "react-icons/hi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import AuthApi from "../../apis/auth.api";
import { AxiosError } from "axios";

export const BtnToAdmin: NextPage = () => {
  const router = useRouter();

  const handleMoveToAdminClick = async () => {
    try {
      const isAdmin = await AuthApi.checkAdmin();
      if (isAdmin) {
        router.push("/admin/dashboard");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const { status }: any = e.response;
        if (status === 403 || status === 401) {
          alert("유효하지 않은 접근입니다.");
        }
      }
    }

    // router.push("/auth/sign-in");
  };

  return (
    <a
      onClick={handleMoveToAdminClick}
      className={
        "ring-1 flex justify-center items-center w-40 px-2 py-2 font-bold text-center text-xl select-none hover:ring-2 hover:duration-200 hover:cursor-pointer active:ring-4"
      }
    >
      <HiOutlineChartPie className={"mr-2"} /> 관리자 페이지
    </a>
  );
};

export default BtnToAdmin;
