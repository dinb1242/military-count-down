import BtnBack from "../../../components/buttons/btn-back";
import Bonobono from '../../../public/bonobono.jpg';
import Image from 'next/image';
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export const SignUpCreate = () => {
    return (
        <div className={ 'min-h-screen p-8' }>

            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/auth/sign-up/agree'} />
            </div>

            {/* 등록 전체 폼 */}
            <div className={ 'w-full flex justify-center mt-16' }>
                <div className={ 'lg:w-1/2 md:w-2/3 w-11/12 h-auto border rounded p-8 flex flex-col items-center' }>
                    <ul className="steps w-full">
                        <li className="step step-info font-bold">약관동의</li>
                        <li className="step step-info font-bold">회원가입</li>
                        <li className="step font-bold">완료</li>
                    </ul>
                    <h1 className={ 'mt-8 text-3xl font-bold' }>회원가입</h1>

                    {/* 등록 폼 */}
                    <div className={ 'mt-8 w-full h-auto lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col' }>
                        <div>
                            <label className={ 'label' }>
                                <span className={ 'label-text font-bold text-lg' }>아이디</span>
                            </label>
                            <input type={ 'text' } className={ 'input input-bordered w-full' } />
                        </div>

                        <div>
                            <label className={ 'label' }>
                                <span className={ 'label-text font-bold text-lg' }>비밀번호</span>
                            </label>
                            <input type={ 'password' } className={ 'input input-bordered w-full' } />
                        </div>

                        <div>
                            <label className={ 'label' }>
                                <span className={ 'label-text font-bold text-lg' }>비밀번호 확인</span>
                            </label>
                            <input type={ 'text' } className={ 'input input-bordered w-full' } />
                        </div>

                        <div className={ 'row-span-2 hidden lg:block text-center' }>
                            <Image width={ '200%' } height={ '200%' } src={ Bonobono } />
                        </div>

                        <div>
                            <label className={ 'label' }>
                                <span className={ 'label-text font-bold text-lg' }>성명</span>
                            </label>
                            <input type={ 'text' } className={ 'input input-bordered w-full' } />
                        </div>

                        <div>
                            <label className={ 'label' }>
                                <span className={ 'label-text font-bold text-lg' }>이메일</span>
                            </label>
                            <input type={ 'text' } className={ 'input input-bordered w-full' } />
                        </div>

                        <div>
                            <label className={ 'label' }>
                                <span className={ 'label-text font-bold text-lg' }>휴대번호</span>
                            </label>
                            <div className={ 'flex flex-row items-center w-full' }>
                                <select name={ 'phone1' } className="select select-bordered w-1/3 max-w-xs">
                                    <option selected>010</option>
                                    <option>011</option>
                                    <option>019</option>
                                </select>
                                 <span className={ 'mx-1' }> - </span>
                                <input name={ 'phone2' } type={ 'text' } className={ 'input input-bordered w-1/3' } />
                                <span className={ 'mx-1' }> - </span>
                                <input name={ 'phone3' } type={ 'text' } className={ 'input input-bordered w-1/3' } />
                            </div>
                        </div>
                    </div>
                    {/* 가입 버튼 */}
                    <div className={ 'mt-4 flex justify-end w-full' }>
                        <Link href={ '/auth/sign-up/complete' }>
                            <a
                                className={ 'justify-center lg:m-0 m-auto bg-emerald-500 lg:px-4 p-2 rounded text-white font-bold text-xl flex flex-row items-center hover:bg-emerald-600 hover:duration-200 active:bg-emerald-700' }
                                // onClick={ (event) =>  onClickCanNextStep(event) }
                            >
                                다음 <HiArrowRight className={ 'ml-2' } />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpCreate;