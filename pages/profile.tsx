import BtnBack from "../components/buttons/btn-back";
import BtnSignOut from "../components/buttons/btn-sign-out";
import { HiUserCircle } from "react-icons/hi";
import Jihyun from '../public/jihyun.jpg';
import Image from 'next/image';

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

                        {/* 학력 */}
                        <div className={ 'flex flex-col items-center my-8' }>
                            <p className={ 'font-bold text-3xl ' }>학력</p>
                            <div className={ 'border w-1/2 py-2 flex flex-col items-center mt-2 rounded-xl gap-y-2' }>
                                <p>성남초등학교(2005 ~ 2011)</p>
                                <p>성일중학교(2011 ~ 2014)</p>
                                <p>성남외국어고등학교 중국어과(2014 ~ 2017)</p>
                                <p>인하공업전문대학 컴퓨터시스템공학과(2017 ~ 2021)</p>
                            </div>
                        </div>

                        <hr className={ 'mt-4' } />

                        {/* 경력 */}
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;