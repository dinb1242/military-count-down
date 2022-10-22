import BtnBack from "../components/buttons/btn-back";
import BtnSignOut from "../components/buttons/btn-sign-out";
import Jihyun from '../public/jihyun.jpeg';
import Image from 'next/image';
import {
    SiFastapi,
    SiJava,
    SiNestjs,
    SiNumpy, SiPandas,
    SiPython,
    SiScikitlearn,
    SiSpringboot, SiTensorflow,
    SiTypescript
} from 'react-icons/si';

export const Profile = () => {
    return (
        <div className={ 'min-h-screen p-8' }>
            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/'} />
                <BtnSignOut />
            </div>

            {/* 본문 바디 */}
            <div className={ 'w-full flex flex-col items-center' }>
                {/* 본문 */}
                <div className={ 'xl:w-2/3 w-4/5 border mt-16 flex flex-col items-center rounded' }>
                    {/* 프로필 바디 */}
                    <div className={ 'mt-8' }>
                        {/* 프로필 */}
                        <div className="hero">
                            <div className="hero-content flex-col lg:flex-row">
                                <Image className={ 'mask mask-squircle' } width={ '250%' } height={ '250%' } src={ Jihyun } />
                                <div className={ 'ml-4 p-2' }>
                                    <h1 className="text-4xl font-bold break-words">정지현</h1>
                                    <h1 className="text-3xl font-bold break-words">(잡기술 개발자)</h1>
                                    <p className="py-6 whitespace-pre-line">
                                        언제나 고통받던 정지현은 이제 <b>2022년 이후로 미림미디어랩에 없습니다.</b>
                                        <br/>
                                        왜냐하면 그는 긴 IT산업기능요원의 생활에 마침표를 찍었기 때문이죠.
                                        <br/>
                                        <br/>
                                        어디에 있을까요?
                                        <br/>
                                        <br/>
                                        아마 지금쯤 대한민국 어딘가에서 하고 싶은 개발을 하며 행복하게 지내고 있지 않을까요?
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className={ 'mt-4' } />

                        {/* 관심 분야 */}
                        <div className={ 'flex flex-col items-center my-8' }>
                            <p className={ 'font-bold text-3xl ' }>관심 분야</p>
                            <div className={ 'border w-4/5 p-4 flex flex-col mt-2 rounded-xl gap-y-2' }>
                                <p>Artificial Intelligence, Recommendation System, Event Driven Arch., Domain Driven Development, Test Driven Development, Clean Arch., Hibernate, Cloud Computing, Full-stack Development</p>
                            </div>
                        </div>

                        <hr className={ 'mt-4' } />

                        {/* 기술 스택 */}
                        <div className={ 'flex flex-col items-center my-8' }>
                            <p className={ 'font-bold text-3xl ' }>기술 스택</p>
                            <div className={ 'border w-4/5 p-4 flex flex-row flex-wrap justify-center mt-2 rounded-xl gap-2' }>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-pink-500 text-white' }>
                                    <SiJava className={ 'mr-1' } /> Java
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-sky-700 text-white' }>
                                    <SiPython className={ 'mr-1' } /> Python
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-blue-700 text-white' }>
                                    <SiTypescript className={ 'mr-1' } /> TypeScript
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-emerald-500 text-white' }>
                                    <SiSpringboot className={ 'mr-1' } /> Spring Boot
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-red-600 text-white' }>
                                    <SiNestjs className={ 'mr-1' } /> Nest.js
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-teal-600 text-white' }>
                                    <SiFastapi className={ 'mr-1' } /> FastAPI
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-cyan-900 text-white' }>
                                    <SiNumpy className={ 'mr-1' } /> Numpy
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-cyan-900 text-white' }>
                                    <SiPandas className={ 'mr-1' } /> Pandas
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-green-900 text-white' }>
                                    Matplotlib
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-amber-500 text-white' }>
                                    <SiScikitlearn className={ 'mr-1' } /> Scikit-Learn
                                </span>
                                <span className={ 'border w-auto px-4 flex flex-row items-center bg-orange-500 text-white' }>
                                    <SiTensorflow className={ 'mr-1' } /> Tensorflow
                                </span>
                            </div>
                        </div>

                        <hr className={ 'mt-4' } />

                        {/* 학력 */}
                        <div className={ 'flex flex-col items-center my-8' }>
                            <p className={ 'font-bold text-3xl ' }>학력</p>
                            <div className={ 'border w-1/2 py-2 flex flex-col p-4 mt-2 rounded-xl gap-y-2' }>
                                <p>성남초등학교(2005 ~ 2011)</p>
                                <p>성일중학교(2011 ~ 2014)</p>
                                <p>성남외국어고등학교 중국어과(2014 ~ 2017)</p>
                                <p>인하공업전문대학 컴퓨터시스템공학과(2017 ~ 2021)</p>
                            </div>
                        </div>

                        <hr className={ 'mt-4' } />

                        {/* 논문 */}
                        <div className={ 'flex flex-col items-center my-8' }>
                            <p className={ 'font-bold text-3xl ' }>논문</p>
                            <div className={ 'border w-4/5 p-4 flex flex-col mt-2 rounded-xl gap-y-2' }>
                                <p>A Performance Evaluation Analysis of Product Recommendation Techniques (2019.) </p>
                                <p>A Recommendation Technique Based on Offline Product Using Similarity (2019.)</p>
                                <p>An Open Architecture and Open API for e-Commerce Recommendation Model Development Platform (2020.)</p>
                                <p>A Dynamic Recommendation Architecture and Procedure Based on Elasticsearch (2020.)</p>
                                <p>D.I.Y : Block-based Programming Platform for Machine Learning Education (2020.07.)</p>
                                <p>An Incremental Recommendation Technique to Improve Product Recommendation Accuracy (2021.)</p>
                                <p>A Design and Implementation of Recommendation Learning Model Generation Tool Based on Data Analysis (2021.)</p>
                                <p>Design of Python Block Coding Platform based on Web Assembly for Artificial Intelligence Education (2021.)</p>
                            </div>
                        </div>

                        <hr className={ 'mt-4' } />

                        {/* 경력 */}
                        <div className={ 'flex flex-col items-center my-8' }>
                            <p className={ 'font-bold text-3xl ' }>경력</p>
                            <div className={ 'border w-4/5 p-4 flex flex-col mt-2 rounded-xl gap-y-2' }>
                                <p>인하공업전문대학 추천 시스템 연구실 LSTM 기반 Session-based 추천 시스템 개발, 2019 ~ 2020.</p>
                                <p>인하공업전문대학 추천 시스템 연구실 일반화 추천 시스템 개발 및 저작권 등록, 2020.</p>
                                <p>인하공업전문대학 유사모 연구실 D.I.Y 블록 코딩 툴 개발 (CodeB Block Coding Tool 전신), 2020.</p>
                                <p>K-Digital 사업 최초 통과 (CodeB Block Coding Tool), 2021.</p>
                                <p>K-Credit 코알못 과정 개발, 2021.</p>
                                <p>K-Credit 어서와 파이썬 처음이지 과정 개발, 2021.</p>
                                <p>4cSoft LMS 인수 및 서버 구축, 2021.</p>
                                <p>Non-Programming 데이터 분석 툴 프로토타입 개발, 2021.</p>
                                <p>4cSoft LMS 기반 인하공전 CodeB Block Coding Tool LMS 구축, 2021.</p>
                                <p>인하공전 LMS 내 CodeB Tool 상호 연동 시스템 개발, 2021.</p>
                                <p>4cSoft LMS 기반 청라고등학교 LMS 구축, 2021.</p>
                                <p>원광대학교 CodeB Tool 서버 구축, 2021.</p>
                                <p>4cSoft LMS 기반 미림미디어랩 LMS 구축, 2021.</p>
                                <p>미림미디어랩 LMS 내 메타버스 연동 기능 및 관리자 페이지 내 관리 기능 개발, 2021.</p>
                                <p>4cSoft LMS 기반 서울산업진흥원(SBA) On-boarding LMS 구축, 2022.</p>
                                <p>충남교통연수원 LMS 백엔드 신규 개발 및 유지보수, 2022.</p>
                            </div>
                        </div>

                        <hr className={ 'mt-4' } />

                        {/* 외주 */}
                        <div className={ 'flex flex-col items-center my-8' }>
                            <p className={ 'font-bold text-3xl ' }>외주</p>
                            <p className={ 'text-xl ' }>과제성 외주 및 소규모 프로젝트는 제외</p>
                            <div className={ 'border w-4/5 p-4 flex flex-col mt-2 rounded-xl gap-y-2' }>
                                <p>운동 루틴 관리를 위한 허리업 앱 외주 백엔드 개발 (Nest.js), 2021.</p>
                                <p>오늘식탁(오늘회) 수산물업자용 관리 앱 외주 백엔드 개발 (Spring Boot), 2021.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;