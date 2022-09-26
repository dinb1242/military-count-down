import { NextPage } from "next";
import Head from "next/head";

const People: NextPage = () => {

    return (
        <div className={ 'mt-32 min-h-screen flex items-center flex-col' }>
            <Head>
                <title>함께한 사람들</title>
            </Head>

            {/* 상단 타이틀 */}
            <div className={'flex flex-col items-center'}>
                <h1 className={'text-4xl font-bold text-blue-500'}>함께한 사람들</h1>
                <h2 className={'mt-4 text-xl font-bold'}>지금까지 함께한 사람들의 명예의 전당이라고 할 수 있습니다.</h2>
            </div>

            {/* 본문 */}
            <div className={'mt-4 bg-amber-200 w-1/2 h-1/2'}>
                하이
            </div>
        </div>
    );
}

export default People;