import { useEffect } from "react";
import { useRouter } from "next/router";
import AuthApi from "../apis/auth.api";
import { AxiosError } from "axios";
import { AdminNav } from "../components/nav/admin.nav";

export const AdminLayout = ({children}: any) => {
  // 어드민 페이지에 대한 접근 권한을 확인한다.
  // 만일, 어드민이 아닐 시, 안내 모달창과 함께 메인 페이지로 이동시킨다.
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = () => {
      try {
        if (typeof window !== 'undefined') {
          const authorization: string | null = localStorage.getItem('Access-Token');

          if (!authorization) {
            // 토큰이 없을 경우, 로그인 페이지로 이동시킨다.
            router.push('/auth/sign-in');
          } else {
            // 어드민 권한 및 토큰 진위 여부를 파악한다.
            AuthApi.checkAdmin()
              .catch((err) => {
                if (err instanceof AxiosError) {
                  const {status}: any = err.response;
                  alert('비정상적인 접근입니다.');
                  if (status === 401) {
                    // 토큰이 유효하지 않은 경우이므로 로그인 페이지로 이동시킨다.
                    router.push('/auth/sign-in');
                  } else {
                    // 관리자 권한이 없는 경우, 메인 페이지로 이동시킨다.
                    router.push('/');
                  }
                } else {
                  console.log(err);
                  alert('예기치 못한 오류!');
                }
            })
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    checkAdmin();
  }, [])

  return (
    <div className={'container min-h-screen flex flex-row flex-none'}>
      <nav className={'w-80'}><AdminNav /></nav>
      <main style={{ flexGrow: 1 }} className={ 'p-8' }>
        <div className={'border rounded p-8'}>
          { children }
        </div>
      </main>
    </div>
  );
}