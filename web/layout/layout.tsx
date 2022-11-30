import { useRouter } from 'next/router';
import AuthApi from '../apis/auth.api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/token.constants';

export const Layout = ({ children }: any) => {

  const router = useRouter();
  const pathname = router.pathname;

  // 토큰 없이 접근 가능한 페이지 정규식 및 조건 검사를 수행한다.
  // 만일, 조건식에 해당할 경우, 페이지 이동을 허가한다.
  // 그러나, 토큰이 존재할 경우에는 페이지 이동을 불허한다.
  if (typeof window !== 'undefined') {
    const publicPath: RegExp = /\/auth/g
    const authorization: string | null = localStorage.getItem('Access-Token');
    if (pathname.match(publicPath)) {
      // 토큰이 존재할 경우, 진위 여부를 파악한다.
      if (authorization) {
        // 토큰 검증을 시도한다.
        // 유효하지 않을 경우, Local Storage 내 데이터를 제거하고, 로그인 화면으로 이동한다.
        AuthApi.checkToken()
          .then(res => {
            if (res.data.success)
              router.push('/')
          })
          .catch(() => {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          router.push('/auth/sign-in')
        })
      }
    } else { // 로그인이 필요한 페이지일 때 토큰을 검증한다.
      // 토큰 검증 시도
      AuthApi.checkToken().catch(() => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        router.push('/auth/sign-in')
      })
    }
  }

  return (
    <div>
      <main>{ children }</main>
    </div>
  )
}