import BtnBack from "../../../components/buttons/btn-back";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

enum AgreeTypes {
    SERVICE_TERM_CHECK = 'serviceTermCheck',
    PRIVACY_TERM_CHECK = 'privacyTermCheck'
}

export const SignUpAgree = () => {

    const router = useRouter();

    const [isAgree, setIsAgree] = useState({
        serviceTerm: false,
        privacyTerm: false
    });

    const [isAllAgree, setIsAllAgree] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const serviceTerm = `전역일 계산기 및 미림 위키(이하 '서비스'라 함)를 이용해주셔서 감사합니다.
    
지현이의 전역일 계산 및 미림미디어랩 재직 시 함께 했던 일들을 기록하는 서비스입니다.
본 서비스 이용약관 동의 시, 추후 정트리오(이하 '회사라 함') 프로젝트를 진행함에 있어서 함께 할 가능성이 있다는 것으로 간주됩니다.
미동의 시, 본 서비스를 이용할 수 없으며, 동의 이후 회원가입 진행 시 해당 정보는 데이터베이스에 영구 저장(노예 계약)됩니다.
    `

    const privacyTerm = `본 서비스는 회원가입을 통해 최소한의 정보(아이디, 비밀번호, 성명, 휴대번호)만 수집합니다.
해당 정보는 본 사이트 내의 이용 및 추후 회사 입사 시, 참고용으로만 사용됩니다.
    `

    const onClickTermAgree = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        const agreeType = event.currentTarget.id;
        if (agreeType === AgreeTypes.SERVICE_TERM_CHECK)
            setIsAgree({
                ...isAgree,
                ['serviceTerm']: !isAgree.serviceTerm
            })
        else
            setIsAgree({
                ...isAgree,
                ['privacyTerm']: !isAgree.privacyTerm
            })
    }

    const onClickAllTermAgree = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        // 전체 동의가 false 상태일 경우, isAgree 객체의 엘리먼트가 false 인 항목만 true 로 변경한다.
        if (!isAllAgree) {
            if (isAgree.serviceTerm && !isAgree.privacyTerm)
                setIsAgree({
                    ...isAgree,
                    ['privacyTerm']: true
                })
            else if (!isAgree.serviceTerm && isAgree.privacyTerm)
                setIsAgree({
                    ...isAgree,
                    ['serviceTerm']: true
                })
            else
                setIsAgree({
                    ...isAgree,
                    ['serviceTerm']: true,
                    ['privacyTerm']: true
                })
        } else { // 모든 isAgree 의 상태를 false 로 변경한다.
            setIsAgree({
                ...isAgree,
                ['serviceTerm']: false,
                ['privacyTerm']: false
            })
        }
    }

    // 이용 약관 둘 중에 하나라도 체크가 해제되었을 경우, 전체 동의 체크도 해제한다.
    // 모두 해제가 되었을 경우, 전체 동의를 체크한다.
    useEffect(() => {
        if (!isAgree.serviceTerm || !isAgree.privacyTerm)
            setIsAllAgree(false);
        else if (isAgree.serviceTerm && isAgree.privacyTerm)
            setIsAllAgree(true);
    }, [isAgree.serviceTerm, isAgree.privacyTerm])

    // 전체 동의가 되지 않았을 경우, 다음 페이지로 넘어갈 수 없도록 한다.
    const onClickCanNextStep = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (!isAllAgree) {
            openModal();
        } else {
            router.push('/auth/sign-up/create');
        }
    }

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    return (
        <div className={ 'min-h-screen p-8' }>
            <div className={ isOpenModal ? 'modal modal-open' : 'modal' }>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">약관 동의 미완료</h3>
                    <p className="py-4">모든 필수 약관에 동의해주세요.</p>
                    <div className="modal-action">
                        <label className="btn" onClick={ closeModal }>확인</label>
                    </div>
                </div>
            </div>

            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/auth/sign-in'} />
            </div>

            {/* 동의 폼 */}
            <div className={ 'w-full flex flex-col items-center' }>
                <div className={ 'lg:w-2/3 w-11/12 h-auto border mt-16 flex flex-col items-center p-8' }>
                    <ul className="steps w-full">
                        <li className="step step-info font-bold">약관동의</li>
                        <li className="step font-bold">회원가입</li>
                        <li className="step font-bold">완료</li>
                    </ul>

                    <h1 className={ 'mt-8 text-3xl font-bold' }>약관동의</h1>
                    <div className={ 'w-full mt-4' }>
                        <label id={ AgreeTypes.SERVICE_TERM_CHECK } className="label cursor-pointer" onClick={ (event) => onClickTermAgree(event) }>
                            <span className="label-text font-bold text-xl flex flex-row items-center">
                                {
                                    !isAgree.serviceTerm ?
                                        <span><HiCheckCircle className={ 'text-gray-500 w-8 h-8 mr-2' } /></span> :
                                        <span><HiCheckCircle className={ 'text-green-500 w-8 h-8 mr-2' } /></span>
                                }
                                <div className={ 'flex lg:flex-row flex-col' }>
                                    <span>전역일 계산기 및 미림 위키 이용 약관</span>
                                    <span>(필수)</span>
                                </div>
                            </span>
                        </label>
                        <textarea
                            className="textarea textarea-info w-full h-48"
                            readOnly
                            value={
                                serviceTerm
                            }
                        />
                    </div>

                    <div className={ 'w-full mt-4' }>
                        <label id={ AgreeTypes.PRIVACY_TERM_CHECK } className="label cursor-pointer" onClick={ (event) => onClickTermAgree(event) }>
                            <span className="label-text font-bold text-xl flex flex-row items-center">
                                {
                                    !isAgree.privacyTerm ?
                                        <span><HiCheckCircle className={ 'text-gray-500 w-8 h-8 mr-2' } /></span> :
                                        <span><HiCheckCircle className={ 'text-green-500 w-8 h-8 mr-2' } /></span>
                                }
                                <div className={ 'flex lg:flex-row flex-col' }>
                                    <span>개인정보이용동의 약관</span>
                                    <span>(필수)</span>
                                </div>
                            </span>
                        </label>
                        <textarea
                            className="textarea textarea-info w-full h-28"
                            readOnly
                            value={
                                privacyTerm
                            }
                        />
                    </div>

                    <div className={ 'w-full flex lg:flex-row flex-col lg:justify-between' }>
                        <label className="left label cursor-pointer" onClick={ onClickAllTermAgree }>
                            <span className="label-text font-bold text-xl flex flex-row items-center">
                                {
                                    !isAllAgree ?
                                        <span><HiCheckCircle className={ 'text-gray-500 w-8 h-8 mr-2' } /></span> :
                                        <span><HiCheckCircle className={ 'text-green-500 w-8 h-8 mr-2' } /></span>
                                }
                                <span>전체 동의</span>
                            </span>
                        </label>

                        <Link href={ '' }>
                            <a
                                className={ 'lg:m-0 m-auto bg-emerald-500 lg:px-4 p-2 rounded text-white font-bold text-xl flex flex-row items-center hover:bg-emerald-600 hover:duration-200 active:bg-emerald-700' }
                                onClick={ (event) =>  onClickCanNextStep(event) }
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

export default SignUpAgree;