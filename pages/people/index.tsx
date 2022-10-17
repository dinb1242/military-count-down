import { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link';
import { HiArrowCircleLeft, HiPlusCircle, HiUserCircle } from 'react-icons/hi'
import BtnBack from '../../components/buttons/btn-back';
import BtnSignOut from "../../components/buttons/btn-sign-out";

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
                    <div className="card w-80 bg-base-100 shadow-xl hover:bg-gray-200 hover:duration-200 active:bg-gray-300">
                        <figure><HiUserCircle className={ 'w-64 h-64' }/></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                백형서
                                <div className="badge badge-info">풀스택 개발자</div>
                            </h2>
                            <div className="card-actions mt-2">
                                <div className="badge badge-outline">충남교통연수원</div>
                                <div className="badge badge-outline">미림미디어랩 신 LMS</div>
                                <div className="badge badge-outline">네이버 추천엔진 리드개발</div>
                                <div className="badge badge-outline">카카오 서버 관리 통합 시스템 구축</div>
                            </div>
                        </div>
                    </div>

                    <div className="card w-80 bg-base-100 shadow-xl hover:bg-gray-200 hover:duration-200 active:bg-gray-300">
                        <figure><HiUserCircle className={ 'w-64 h-64' }/></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                최용호
                                <div className="badge badge-secondary">백엔드 개발자</div>
                            </h2>
                            <div className="card-actions mt-2">
                                <div className="badge badge-outline">충남교통연수원</div>
                                <div className="badge badge-outline">카카오 전자세금</div>
                                <div className="badge badge-outline">배달의민족 전산관리시스템</div>
                                <div className="badge badge-outline">구글 검색엔진 최적화</div>
                            </div>
                        </div>
                    </div>

                    <div className="card w-80 bg-base-100 shadow-xl hover:bg-gray-200 hover:duration-200 active:bg-gray-300">
                        <figure><HiUserCircle className={ 'w-64 h-64' }/></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                이세정
                                <div className="badge badge-primary">프론트엔드 개발자</div>
                            </h2>
                            <div className="card-actions mt-2">
                                <div className="badge badge-outline">충남교통연수원</div>
                                <div className="badge badge-outline">카카오 전자세금</div>
                                <div className="badge badge-outline">미림미디어랩 신 LMS</div>
                                <div className="badge badge-outline">당근마켓 모니터링 시스템</div>
                            </div>
                        </div>
                    </div>

                    <div className="card w-80 bg-base-100 shadow-xl hover:bg-gray-200 hover:duration-200 active:bg-gray-300">
                        <figure><HiUserCircle className={ 'w-64 h-64' }/></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                이제호
                                <div className="badge badge-primary">프론트엔드 개발자</div>
                            </h2>
                            <div className="card-actions mt-2">
                                <div className="badge badge-outline">충남교통연수원</div>
                                <div className="badge badge-outline">카카오 전자세금</div>
                                <div className="badge badge-outline">미림미디어랩 신 LMS</div>
                                <div className="badge badge-outline">당근마켓 모니터링 시스템</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default People;