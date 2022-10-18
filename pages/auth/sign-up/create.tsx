import BtnBack from "../../../components/buttons/btn-back";
import Bonobono from '../../../public/bonobono.jpg';
import Image from 'next/image';

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
                            <input type={ 'text' } className={ 'input input-bordered w-full' } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpCreate;