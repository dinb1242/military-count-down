import BonobonoClap from "../../../public/bonobono-thinking.gif";
import Image from "next/image";
import Link from "next/link";
import { NextPageContext } from "next";
import { GoSignIn } from "react-icons/go";

export const getServerSideProps = (context: NextPageContext) => {
    const { complete } = context.query;

    if (!complete) {
        return {
            redirect: {
                permanent: true,
                destination: '/auth/sign-in'
            },
            props: {}
        }
    }

    return {
        props: {}
    }
}

export const Complete = () => {
    return (
        <div className={ 'min-h-screen p-8 flex flex-col items-center' }>
            <div className={ 'border mt-32 lg:w-1/2 w-4/5 flex flex-col items-center' }>
                {/* 상단 */}
                <div className={ 'w-full mt-16 flex flex-col items-center' }>
                    <ul className="steps w-full">
                        <li className="step step-info font-bold">약관동의</li>
                        <li className="step step-info font-bold">회원가입</li>
                        <li className="step step-info font-bold">완료</li>
                    </ul>
                    <h1 className={ 'mt-8 text-3xl font-bold' }>가입 완료</h1>
                </div>

                {/* 이미지 */}
                <div className={ 'mt-8' } >
                    <Image src={ BonobonoClap } />
                </div>

                {/* 본문 */}
                <div className={ 'my-8 flex items-center flex-col px-2 text-center' }>
                    <h2 className={ 'font-bold text-xl' }>
                        가입이 완료되었습니다.
                    </h2>
                    <br/>
                        <span className={ 'font-bold text-xl' }>지현이의 전역일과 미림의 다양한 정보를 담고 있는</span>
                        <span className={ 'font-bold text-xl' }>미림 위키를 만나보세요.</span>
                    <Link href={ '/auth/sign-in' }>
                        <a className={ 'mt-4 text-xl font-bold bg-blue-500 text-white py-2 px-4 rounded hover:duration-200 hover:bg-blue-600 flex flex-row items-center active:bg-blue-700' }>
                            <GoSignIn className={ 'mr-1' } /> 로그인 페이지로 이동
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Complete;