import { HiArrowCircleRight, HiUserCircle } from "react-icons/hi";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import AuthApi from '../../apis/auth.api';
import { useRouter } from 'next/router';
import AlertModal from '../../components/modals/alert.modal';

export const SignIn = () => {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // 로그인 시, 이메일, 비밀번호 비어있는 상태를 관리하기 위한 상태 변수
  const [isAccountEmpty, setIsAccountEmpty] = useState({
    email: false,
    password: false,
  })

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen((a) => !a);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });

    if (name === 'email' && value !== '')
      setIsAccountEmpty({
        ...isAccountEmpty,
        email: false,
      })
    else if (name === 'password' && value !== '')
      setIsAccountEmpty({
        ...isAccountEmpty,
        password: false,
      })
  };

  const handleSignInClick = async () => {
    const { email, password } = inputs;

    if (email === '' && password === '') {
      setIsAccountEmpty({
        email: true,
        password: true
      })
    } else if (email === '') {
      setIsAccountEmpty({
        ...isAccountEmpty,
        email: true
      })
    } else if (password === '') {
      setIsAccountEmpty({
        ...isAccountEmpty,
        password: true
      })
    }

    await AuthApi.signIn({ email, password })
      .then((res: any) => {
        // 로그인에 성공하였다면, 토큰을 LocalStorage 에 저장한다.
        if (res.data.success) {
          const { accessToken, refreshToken } = res.data.data;
          localStorage.setItem('Access-Token', accessToken);
          localStorage.setItem('Refresh-Token', refreshToken);
          router.push('/');
        }
      }).catch(() => {
        setIsModalOpen(true);
      })
  }

  return (
    <div
      className={ "min-h-screen p-8 flex flex-col justify-center items-center" }
    >
      <AlertModal isOpen={ isModalOpen } handleModal={ handleModal } title={ '로그인 실패' } content={ '아이디 혹은 비밀번호가 일치하지 않습니다.' }/>
      <div className={ "border rounded w-96 h-auto flex flex-col items-center" }>
        <div className={ "flex flex-col items-center mt-8" }>
          <HiUserCircle className={ "w-16 h-16 text-gray-500" }/>
          <h1 className={ "text-2xl font-bold" }>로그인</h1>
        </div>

        {/* 로그인 폼 */ }
        <div className={ "w-2/3" }>
          <label className="label">
            <span className="label-text font-bold">이메일</span>
          </label>
          <input
            className={
              "input input-md input-info input-bordered w-full max-w-xs"
            }
            name={ "email" }
            value={ inputs.email }
            onChange={ (event) => handleInputChange(event) }
          />
          <div>
            <span className={ 'text-xs text-red-500' }>
              { isAccountEmpty.email && '아이디를 입력해주세요.' }
            </span>
          </div>
          <label className="label">
            <span className="label-text font-bold">비밀번호</span>
          </label>
          <input
            className={
              "input input-md input-info input-bordered w-full max-w-xs"
            }
            type={ "password" }
            name={ 'password' }
            value={ inputs.password }
            onChange={ (event) => handleInputChange(event) }
          />
          <div>
            <span className={ 'text-xs text-red-500' }>
              { isAccountEmpty.password && '비밀번호를 입력해주세요.' }
            </span>
          </div>
        </div>
        <a className={ "mt-4" } onClick={ handleSignInClick }>
          <HiArrowCircleRight
            className={
              "w-12 h-12 transition hover:duration-200 ease-in-out rounded-full cursor-pointer text-emerald-500 hover:scale-110 hover:-translate-y-1 hover:text-emerald-600 active:text-emerald-700 hover:duration-200"
            }
          />
        </a>
        <Link href={ "/auth/sign-up/agree" }>
          <a
            className={
              "my-4 text-blue-500 font-bold transition hover:duration-200 hover:-translate-y-1 hover:scale-110"
            }
          >
            아직 회원이 아니신가요?
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;