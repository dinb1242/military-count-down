import { HiArrowCircleRight, HiUserCircle } from "react-icons/hi";
import Link from 'next/link';

export const SignIn = () => {
    return (
        <div className={ 'min-h-screen p-8 flex flex-col justify-center items-center' }>
            <div className={ 'border rounded w-80 h-auto flex flex-col items-center' }>
                <div className={ 'flex flex-col items-center mt-8' }>
                    <HiUserCircle className={ 'w-16 h-16 text-gray-500' } />
                    <h1 className={ 'text-2xl font-bold' }>로그인</h1>
                </div>

                {/* 로그인 폼 */}
                <div className={ '' }>
                    <label className="label">
                        <span className="label-text font-bold">아이디</span>
                    </label>
                    <input className={ 'input input-md input-info input-bordered w-full max-w-xs' } />
                    <label className="label">
                        <span className="label-text font-bold">비밀번호</span>
                    </label>
                    <input className={ 'input input-md input-info input-bordered w-full max-w-xs' } type={ 'password' } />
                </div>
                <Link href={'/'}>
                    <a className={ 'mt-4' }>
                        <HiArrowCircleRight className={ 'w-12 h-12 transition ease-in-out rounded-full cursor-pointer text-emerald-500 hover:scale-110 hover:-translate-y-1 hover:text-emerald-600 active:text-emerald-700 hover:duration-200' } />
                    </a>
                </Link>
                <Link href={ '/auth/sign-up/agree' }>
                    <a className={ 'my-4 text-blue-500 font-bold transition hover:-translate-y-1 hover:scale-110' }>아직 회원이 아니신가요?</a>
                </Link>
            </div>
        </div>
    );
}

export default SignIn;