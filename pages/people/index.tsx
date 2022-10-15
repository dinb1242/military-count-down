import { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link';
import { HiArrowCircleLeft, HiPlusCircle } from 'react-icons/hi'
import BtnBack from '../../components/buttons/btn-back';

const People: NextPage = () => {

    return (
        <div className={ 'min-h-screen p-8' }>
            <Head>
                <title>함께한 사람들</title>
            </Head>

            {/* TODO: 뒤로가기 버튼 공통 컴포넌트 만들 것. */}
            <BtnBack where={'/'} />

            <div className={'mt-32 flex items-center flex-col'}>
                {/* 상단 타이틀 */}
                <div className={'flex flex-col items-center text-center select-none'}>
                    <h1 className={'text-4xl font-bold text-blue-500'}>함께한 사람들</h1>
                    <h1 className={'text-4xl font-bold text-blue-500'}>(2021.01. ~ 2022.12.)</h1>
                    <h2 className={'mt-4 text-xl font-bold'}>지금까지 함께한 사람들의 명예의 전당이라고 할 수 있습니다.</h2>
                    <Link href={'/people/create'}>
                        <a className={'mt-2 text-lg font-bold bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-1 hover:bg-blue-600 hover:duration-200 active:bg-blue-700'}>
                            <HiPlusCircle/> 추가하기
                        </a>
                    </Link>
                </div>

                {/* 본문 */}
                <div className={'grid gap-x-10 gap-y-10 auto-rows-auto place-items-center grid-cols-2 mt-8 md:grid-cols-3 md:w-[32rem] select-none'}>
                    <div className={'flex flex-col items-center'}>
                        <div className={'w-32 h-32 bg-blue-500 rounded-full hover:ring-2 hover:duration-200 active:ring-4'}></div>
                        <span className={'mt-2 font-bold'}>백형서</span>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <div className={'w-32 h-32 bg-yellow-500 rounded-full hover:ring-2 hover:duration-200 active:ring-4'}></div>
                        <span className={'mt-2 font-bold'}>최용호</span>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <div className={'w-32 h-32 bg-green-500 rounded-full hover:ring-2 hover:duration-200 active:ring-4'}></div>
                        <span className={'mt-2 font-bold'}>이세정</span>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <div className={'w-32 h-32 bg-green-500 rounded-full hover:ring-2 hover:duration-200 active:ring-4'}></div>
                        <span className={'mt-2 font-bold'}>이세정</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default People;