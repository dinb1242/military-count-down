import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { HiPlusCircle, HiUserCircle } from "react-icons/hi";
import BtnBack from "../../components/buttons/btn-back";
import BtnSignOut from "../../components/buttons/btn-sign-out";
import Card from "../../components/cards/card";

const People: NextPage = () => {

    return (
        <div className={ 'min-h-screen p-8' }>
            <Head>
                <title>함께한 사람들</title>
            </Head>

            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/'} />
                <BtnSignOut />
            </div>

            <div className={'mt-16 flex items-center flex-col'}>
                {/* 상단 타이틀 */}
                <div className={'flex flex-col items-center text-center select-none'}>
                    <h1 className={'text-4xl font-bold text-blue-500'}>함께한 개발자들</h1>
                    <h1 className={'text-4xl font-bold text-blue-500'}>(2021.01. ~ 2022.12.)</h1>
                    <h2 className={'mt-4 text-xl font-bold'}>지금까지 함께한 개발자들의 명예의 전당이라고 할 수 있습니다.</h2>
                    <Link href={'/people/create'}>
                        <a className={'mt-2 text-lg font-bold bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-1 hover:bg-blue-600 hover:duration-200 active:bg-blue-700'}>
                            <HiPlusCircle/> 추가하기
                        </a>
                    </Link>
                </div>

                {/* 본문 */}
                <div className={ 'grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4' }>
                    <Link href={ '/people/wiki/1' }>
                        <>
                            <Card    name={ '백형서' } badgeDesc={ '풀스택 개발자' } badgeColor={ 'badge-primary' }  />
                        </>
                    </Link>

                    <Link href={ '/people/wiki/1' }>
                        <>
                            <Card icon={ <HiUserCircle className={ 'w-64 h-64' }/> } name={ '백형서' } badgeDesc={ '풀스택 개발자' } tags={ ['dsfsdjfiajsdif', 'dsfjsidafjasdifjasdiof', 'dsafijsadfiosadjfoisad'] }  />
                        </>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default People;